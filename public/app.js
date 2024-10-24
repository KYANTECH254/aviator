// Initialize WebSocket connection
const socket = new WebSocket('ws://localhost:3000'); // Connect to WebSocket server on localhost:3000

// Get elements
const loadingScreen = document.getElementById('loading-content');
const mainContent = document.getElementById('main-content');

// Show loading screen
loadingScreen.style.display = 'flex';

// Handle WebSocket connection
socket.onopen = function() {
    console.log('WebSocket connection established');

    // Hide loading screen and show main content
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'block';

    // You can now start sending/receiving messages
};

socket.onerror = function(error) {
    console.error('WebSocket Error:', error);
    // Handle connection errors here
};

socket.onclose = function() {
    console.log('WebSocket connection closed');
    // Optionally, handle the closing of the connection
};

// Optionally handle incoming messages
socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    console.log('Received:', data);
    // Handle incoming data from server
};
