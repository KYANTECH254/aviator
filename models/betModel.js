const db = require('../connection/db.js');

// Save a new bet to the database using phone number
function saveBet(phoneNumber, amount, roundId, clientSeed, callback) {
    const initialCashoutMultiplier = null; // Set to null initially
    const wonAmount = null; // Set to null initially
    const finalMultiplier = null; // Set to null initially

    const insertQuery = `
        INSERT INTO bets (user_id, phone_number, round_id, amount, client_seed, cashout_multiplier, won_amount, final_multiplier)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    getUserByPhoneNumber('254700909271', (err, user) => {
        if (err) {
            console.error('Error retrieving user:', err);
            return;
        }

        if (!user) {
            console.log('No user found');
        }
        console.log('User:', user);

        // Insert the bet into the database
        db.query(insertQuery, [
            user.user_id,        // user_id fetched from the user object
            phoneNumber,         // phone_number
            roundId,             // round_id
            amount,              // amount
            clientSeed,          // client_seed
            initialCashoutMultiplier, // cashout_multiplier
            wonAmount,           // won_amount
            finalMultiplier      // final_multiplier
        ], (insertErr, result) => {
            if (insertErr) {
                console.error('Insert query error:', insertErr); // Log the error
                return callback(insertErr);
            }
            console.log('Bet inserted successfully:', result);
            callback(null, result); // Successful insert
        });
    });
}

// Function to get user by phone number
function getUserByPhoneNumber(phoneNumber, callback) {
    const query = 'SELECT * FROM users WHERE phone = ?';

    console.log('Executing query:', query, [phoneNumber]);  // Debug the query and parameter

    db.query(query, [phoneNumber], (err, results) => {
        if (err) {
            console.error('Database query error:', err); // Log error
            return callback(err); // Pass the error to the callback
        }

        console.log('Query results:', results); // Log the results

        if (results.length > 0) {
            const user = results[0]; // Get the first result
            console.log('User found:', user);  // Log the user details
            callback(null, user); // Pass the user object to the callback
        } else {
            console.log('No user found with phone:', phoneNumber);  // Log if no user is found
            callback(null, null); // No user found
        }
    });
}

// Function to get the client seed for a specific user and round
function getClientSeedForUser(phoneNumber, roundId, callback) {
    const query = 'SELECT client_seed FROM client_seeds WHERE phone_number = ? AND round_id = ?';

    db.query(query, [phoneNumber, roundId], (err, results) => {
        if (err) {
            console.error('Error fetching client seed:', err);
            return callback(err, null);
        }

        // Check if we got any result
        if (results.length > 0) {
            return callback(null, results[0].client_seed);
        } else {
            return callback(null, null);
        }
    });
}

module.exports = {
    saveBet,
    getClientSeedForUser
};
