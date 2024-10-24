const WebSocket = require('ws');
const crypto = require('crypto');
const { saveBet, getClientSeedForUser } = require('../models/betModel'); // Assume this is a valid model
const { getUserDataByPhone, updateUserBalance, getUserClientSeedByPhone } = require('../models/userModel'); // Fetch user details by phone
const db = require('../connection/db'); // Ensure you have your MySQL connection here

// Game state
let gameState = {
    round: 1,
    maxMultiplier: 1.0, // Initialize to 1.0
    multiplier: 1.0,
    isGameActive: false, // Set to false initially
    serverSeed: '',
    hashedServerSeed: '',
    clientSeeds: [] // To store client seeds of the first three participants
};

// Function to generate a random server seed
function generateServerSeed() {
    return crypto.randomBytes(8).toString('hex'); // Generates a random 16 characters (8 bytes)
}

// Function to hash the server seed
function hashServerSeed(serverSeed) {
    return crypto.createHash('sha256').update(serverSeed).digest('hex');
}

// Function to save round data into the database
function saveRoundData(roundData, callback) {
    const query = `
        INSERT INTO rounds (round_number, server_seed, hashed_server_seed, client_seed_1, client_seed_2, client_seed_3, round_result, multiplier) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const { round_number, server_seed, hashed_server_seed, client_seed_1, client_seed_2, client_seed_3, round_result, multiplier } = roundData;

    db.query(query, [round_number, server_seed, hashed_server_seed, client_seed_1, client_seed_2, client_seed_3, round_result, multiplier], callback);
}

// Function to get the last round number from the database
function getLastRoundNumber(callback) {
    const query = `SELECT MAX(round_number) AS last_round FROM rounds`;
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching last round number:', err);
            return callback(err);
        }
        const lastRound = results[0]?.last_round || 0; // Default to 0 if no rounds found
        callback(null, lastRound);
    });
}

// Broadcast message to all connected clients
function broadcast(wss, data) {
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(data));
        }
    });
}

// Handle WebSocket connections and the game loop
function handleGame(wss) {
    // Handle new WebSocket connections
    wss.on('connection', (ws) => {
        console.log('Client connected');

        // Await login/authentication from the client
        ws.on('message', async (message) => {
            const parsedMessage = JSON.parse(message);

            // Handle fetching user data
            if (parsedMessage.type === 'fetch_user_data') {
                const phone = parsedMessage.phone; // Assume phone number is sent from client
                getUserDataByPhone(phone, (err, userData) => {
                    if (err) {
                        ws.send(JSON.stringify({ type: 'error', message: 'Failed to fetch user data' }));
                    } else if (userData) {
                        ws.send(JSON.stringify({ type: 'user_data', data: userData }));
                    } else {
                        ws.send(JSON.stringify({ type: 'error', message: 'User not found' }));
                    }
                });
            }

            // Handle login attempts
            if (parsedMessage.type === 'login') {
                const phone = parsedMessage.data.phone; // Assume phone is sent for login
                getUserDataByPhone(phone, (err, user) => {
                    if (err || !user) {
                        ws.send(JSON.stringify({ type: 'login_failed', data: { message: 'Invalid user' } }));
                        ws.close(); // Close the connection if login fails
                        return;
                    }

                    // Attach user data to the WebSocket connection
                    ws.userId = user.id;
                    ws.balance = user.balance;
                    console.log(`User ${ws.userId} authenticated with balance ${ws.balance}`);

                    // Send a welcome message and balance to the client
                    ws.send(JSON.stringify({
                        type: 'login_success',
                        data: {
                            userId: ws.userId,
                            balance: ws.balance,
                            gameState
                        }
                    }));
                });
            }

            // Handle bets
            if (parsedMessage.type === 'bet') {
                handleBet(parsedMessage.data, ws);
            }

            // Handle Client seeds
            if (parsedMessage.type === 'client_seed') {
                const phone = parsedMessage.phone;
                getUserClientSeedByPhone(phone, (err, clientSeed) => {
                    if (err || !clientSeed) {
                        ws.send(JSON.stringify({ type: 'error', data: { message: 'Invalid user or client seed' } }));
                        ws.close();
                        return;
                    }

                    // Send the client seed to the client
                    ws.send(JSON.stringify({
                        type: 'client_seed',
                        data: {
                            client_seed: clientSeed, 
                        }
                    }));
                });
            }

        });

        ws.on('close', () => {
            console.log('Client disconnected');
        });
    });

    // Game loop logic
    setInterval(() => {
        if (gameState.isGameActive) {
            // Increment the multiplier gradually
            gameState.multiplier += 0.01;

            // Broadcast current multiplier to clients
            broadcast(wss, {
                type: 'multiplier_update',
                data: { multiplier: gameState.multiplier.toFixed(2) } // Send current multiplier
            });

            // Check if the max multiplier is reached
            if (gameState.multiplier >= gameState.maxMultiplier) {
                // Broadcast current multiplier to clients
                broadcast(wss, {
                    type: 'maxmultiplier_update',
                    data: { naxmultiplier: gameState.maxMultiplier.toFixed(2) }
                });

                // Prepare to save round data
                const roundData = {
                    round_number: gameState.round,
                    server_seed: gameState.serverSeed,
                    hashed_server_seed: gameState.hashedServerSeed,
                    client_seed_1: gameState.clientSeeds[0] || null, // First client seed or null
                    client_seed_2: gameState.clientSeeds[1] || null, // Second client seed or null
                    client_seed_3: gameState.clientSeeds[2] || null, // Third client seed or null
                    round_result: gameState.maxMultiplier, // Use maxMultiplier as round result
                    multiplier: gameState.maxMultiplier // Save the final multiplier
                };


                saveRoundData(roundData, (err) => {
                    if (err) {
                        console.error('Error saving round data:', err);
                    } else {
                        console.log('Round data saved successfully!');

                        // Generate client seeds for the next round
                        generateClientSeedsForNextRound(gameState.round);
                    }
                });


                // Prepare for the next round
                gameState.isGameActive = false;

                startNewRound();
            }
        }
    }, 100); // Adjust the interval as necessary
}

function startNewRound() {
    getLastRoundNumber((err, lastRound) => {
        if (err) return console.error('Failed to get last round number.');

        gameState.round = lastRound + 1; // Set the new round number
        let countdown = 5; // 5 seconds countdown
        const countdownInterval = setInterval(() => {
            broadcast(wss, {
                type: 'countdown',
                data: { seconds: countdown }
            });
            countdown--;

            if (countdown < 0) {
                clearInterval(countdownInterval);
                // Start the new round
                gameState.serverSeed = generateServerSeed();
                gameState.hashedServerSeed = hashServerSeed(gameState.serverSeed);

                broadcast(wss, { type: 'server_seed', data: gameState.hashedServerSeed });

                // Reset game state for the new round
                gameState.clientSeeds = []; // Clear client seeds for the next round
                calculateRoundResult(); // Calculate the round result immediately after countdown
            }
        }, 1000); // Update every second
    });
}

// Function to handle bet placement
function handleBet(betData, ws) {
    const { phoneNumber, amount, clientSeed } = betData; // Use phone number

    // Validate the bet amount
    if (amount <= 0) {
        return broadcast(wss, {
            type: 'error',
            data: {
                message: 'Invalid bet amount.',
                phoneNumber
            }
        });
    }

    // Fetch user information to validate if the user exists and has sufficient balance
    getUserDataByPhone(phoneNumber, (err, user) => {
        if (err) {
            console.error('Error fetching user:', err);
            return broadcast(wss, {
                type: 'error',
                data: {
                    message: 'User not found.',
                    phoneNumber
                }
            });
        }

        if (!user || user.balance < amount) {
            return broadcast(wss, {
                type: 'error',
                data: {
                    message: 'Insufficient balance.',
                    phoneNumber
                }
            });
        }

        // Check if the user has a client seed for the current round
        getClientSeedForUser(phoneNumber, gameState.round, (err, existingSeed) => {
            if (err) {
                console.error('Error checking client seed:', err);
                return broadcast(wss, {
                    type: 'error',
                    data: {
                        message: 'Error processing client seed.',
                        phoneNumber
                    }
                });
            }

            // If no existing seed, generate and insert a new one
            if (!existingSeed) {
                const newClientSeed = generateClientSeed(); // Generate a 20-character client seed

                const insertSeedQuery = 'INSERT INTO client_seeds (phone_number, round_id, client_seed) VALUES (?, ?, ?)';
                db.query(insertSeedQuery, [phoneNumber, gameState.round, newClientSeed], (err) => {
                    if (err) {
                        console.error('Error inserting client seed:', err);
                        return broadcast(wss, {
                            type: 'error',
                            data: {
                                message: 'Error saving client seed.',
                                phoneNumber
                            }
                        });
                    }
                    console.log(`Client seed ${newClientSeed} saved for ${phoneNumber} for round ${gameState.round}`);
                    proceedWithBet(user, amount, phoneNumber, newClientSeed, ws);
                });
            } else {
                // Proceed with the bet using the existing seed
                proceedWithBet(user, amount, phoneNumber, existingSeed, ws);
            }
        });
    });
}

// Helper function to proceed with placing the bet and updating balance
function proceedWithBet(user, amount, phoneNumber, clientSeed, ws) {
    // Save the bet to the database using phone number
    saveBet({ phoneNumber, amount, round: gameState.round, clientSeed }, (err) => {
        if (err) {
            console.error('Error saving bet:', err);
            return broadcast(wss, {
                type: 'error',
                data: {
                    message: 'Stage timed out.',
                    phoneNumber
                }
            });
        }

        // Deduct the bet amount from the user's balance
        const newBalance = user.balance - amount; // Calculate new balance
        updateUserBalance(phoneNumber, newBalance, (err) => {
            if (err) {
                console.error('Error updating user balance:', err);
                return broadcast(wss, {
                    type: 'error',
                    data: {
                        message: 'Stage timed out.',
                        phoneNumber
                    }
                });
            }

            // Broadcast the new bet to all clients
            broadcast(wss, {
                type: 'bet_placed',
                data: {
                    phoneNumber,
                    amount,
                    round: gameState.round
                }
            });

            // Collect client seed from the bet data
            if (gameState.clientSeeds.length < 3) {
                gameState.clientSeeds.push(clientSeed);
            }

            // Start the round if three client seeds have been collected
            if (gameState.clientSeeds.length === 3) {
                // Calculate the max multiplier based on the seeds
                calculateMaxMultiplier(); // New function to calculate multiplier

                // Send countdown to clients and then start the next round
                countdownAndStartNewRound(wss);
            }
        });
    });
}

// Function to calculate the max multiplier based on the seeds
function calculateMaxMultiplier() {
    if (gameState.clientSeeds.length >= 3) {
        // Combine server seed with client seeds to generate a round result
        const combinedSeeds = gameState.serverSeed + gameState.clientSeeds.join('');
        const roundResult = crypto.createHash('sha256').update(combinedSeeds).digest('hex');

        // Example multiplier calculation
        const multiplier = parseInt(roundResult.slice(0, 8), 16) % 100 + 1; // Calculate multiplier from round result
        gameState.maxMultiplier = multiplier; // Set maxMultiplier to the calculated multiplier
    }
}

// Function to generate a random client seed of length 20
function generateClientSeed() {
    const randomString = crypto.randomBytes(15).toString('base64'); // Generate a base64 string (15 bytes = 20 characters)
    return randomString.replace(/\+/g, 'X').replace(/\//g, 'Y').slice(0, 20); // Replace characters and ensure it's 20 characters long
}

// Function to generate client seeds for users after the round ends
function generateClientSeedsForNextRound(roundId) {
    const query = 'SELECT phone_number FROM client_seeds WHERE auto_generate = true';

    db.query(query, (err, users) => {
        if (err) {
            console.error('Error fetching users for client seed generation:', err);
            return;
        }

        // Generate and save client seeds for each user
        users.forEach(user => {
            const clientSeed = generateClientSeed(); // Generate a 20-character client seed
            const insertQuery = 'INSERT INTO client_seeds (phone_number, round_id, client_seed) VALUES (?, ?, ?)';
            db.query(insertQuery, [user.phone_number, roundId, clientSeed], (err) => {
                if (err) {
                    console.error('Error saving client seed:', err);
                } else {
                    console.log(`Client seed ${clientSeed} saved for ${user.phone_number} for round ${roundId}`);

                    // Send the client seed to the user via WebSocket
                    broadcast(wss, {
                        type: 'client_seed_generated',
                        data: {
                            phone: user.phone_number,
                            roundId,
                            clientSeed
                        }
                    });
                }
            });
        });
    });
}

// Function to start a new round with countdown
function countdownAndStartNewRound(wss) {
    let countdown = 5; // 5 seconds countdown

    const countdownInterval = setInterval(() => {
        // Broadcast countdown to all clients
        broadcast(wss, {
            type: 'countdown',
            data: {
                countdown
            }
        });

        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            startNewRound(); // Start the round after countdown
        }
    }, 1000); // Update every second
}



module.exports = {
    handleGame
};