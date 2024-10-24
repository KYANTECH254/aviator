const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const path = require('path');
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware for enabling CORS
const userRoutes = require('./routes/Aviator'); // Import user-related routes
const { handleGame } = require('./controllers/gameController');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware setup
app.use(cors()); // Enable CORS for all requests
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded request bodies

// Serve the client HTML files
app.use(express.static(path.join(__dirname, '/public')));

// Use the user routes
app.use('/api', userRoutes); // Prefix all user-related routes with /api

app.use('/home', (req,res)=>{
    res.status(200).send('<h1>Home</h1>');
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send('<h1>ERROR 404: Resource not found</h1>');
});

// Initialize game handling
handleGame(wss);

// Start the server
server.listen(3000, () => {
    console.log('Server running on port 3000');
});
