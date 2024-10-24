const db = require('../connection/db.js');
const bcrypt = require('bcrypt');

// Function to fetch user data using phone number
function getUserDataByPhone(phone, callback) {
    const query = 'SELECT username, avatar, balance, currency FROM users WHERE phone = ?';

    db.query(query, [phone], (error, results) => {
        if (error) {
            return callback(error); // Handle database error
        }
        if (results.length > 0) {
            callback(null, results[0]); // Return the first result
        } else {
            callback(null, null); // No user found
        }
    });
}

// Function to fetch client seed data using phone number
function getUserClientSeedByPhone(phone, callback) {
    const query = 'SELECT client_seed FROM client_seeds WHERE phone_number = ?';

    db.query(query, [phone], (error, results) => {
        if (error) {
            console.error('Query error:', error); // Log the error
            return callback(error);
        }
        if (results.length > 0) {
            callback(null, results[0].client_seed);
        } else {
            callback(null, null);
        }
    });
}

// Create a new user (with password hashing)
function createUser(phone, username, avatar, currency, balance, callback) {
    const query = 'INSERT INTO users (username, avatar, balance, phone, currency) VALUES (?, ?, ?, ?, ?)';
    let bal;
    if (!balance) {
        bal = 1000;
    }
    bal = balance;

    // Execute the query with the username, avatar, and initial balance
    db.query(query, [username, avatar, bal, phone, currency], (error, results) => {
        if (error) {
            return callback(error); // Handle database error
        }
        callback(null, results); // Successful callback
    });
}

// Get user balance
function getUserBalance(userId, callback) {
    const query = 'SELECT balance FROM users WHERE id = ?';
    db.query(query, [userId], (err, result) => {
        if (err) return callback(err);
        callback(null, result[0].balance);
    });
}

// Update user balance after bet
function updateUserBalance(phone, newBalance, callback) {
    const query = 'UPDATE users SET balance = ? WHERE phone = ?';
    db.query(query, [newBalance, phone], callback);
}

module.exports = {
    createUser,
    getUserBalance,
    getUserDataByPhone,
    updateUserBalance,
    getUserClientSeedByPhone
};
