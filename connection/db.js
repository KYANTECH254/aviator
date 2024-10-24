const mysql = require("mysql")

// Create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'aviator'
});

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log("Mysql connected...")
})

module.exports = db;