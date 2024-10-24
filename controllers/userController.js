const bcrypt = require('bcrypt');
const { createUser } = require('../models/userModel'); // Assuming a model for user-related DB operations

// Function to generate a random avatar filename
function getRandomAvatar() {
    const avatarNumber = Math.floor(Math.random() * 72) + 1; // Random number between 1 and 72
    return `av-${avatarNumber}.png`;
}

// Handle user registration from external source
async function registerUserFromExternal(req, res) {
    const { phoneNumber, currency, balance } = req.body; // Expecting phoneNumber in the request body

    // Basic validation
    if (!phoneNumber) {
        return res.status(400).json({ success: false, message: 'Phone number is required.' });
    }

    // Generate username from the phone number (2***1)
    const username = generateUsernameFromPhone(phoneNumber);

    try {
        // Generate a random avatar for the user
        const avatar = getRandomAvatar();

        // Save the new user to the database
        const newUser = { phoneNumber, username, avatar, currency, balance }; // Initialize balance at 1000
        createUser(phoneNumber, username, avatar, currency, balance, (err) => {
            if (err) {
                console.error('Error creating user:', err);
            } else {
                console.log('User created successfully!');
            }
        });

        return res.status(201).json({ success: true, message: 'User registered successfully!', userId: newUser.id, avatar });
    } catch (error) {
        console.error('Registration error:', error);
        return res.status(500).json({ success: false, message: 'Internal server error.' });
    }
}

// Function to generate username from phone number
function generateUsernameFromPhone(phoneNumber) {
    if (phoneNumber.length < 4) return phoneNumber; // Simple fallback
    return `${phoneNumber[0]}***${phoneNumber[phoneNumber.length - 1]}`;
}

module.exports = {
    registerUserFromExternal
};
