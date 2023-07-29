// Import the 'express' module as express
var express = require('express');

// Import the 'cors' (Cross-Origin Resource Sharing) module as cors. This is used to enable cross origins requests
var cors = require('cors');

// Use 'dotenv' module to load environment variables from a .env file into process.env
require('dotenv').config();

// Create an Express application instance
var app = express();

// Use CORS middleware on the app. This sets up some headers on the HTTP responses telling browsers to allow us to make requests from our client-side JavaScript code to our server
app.use(cors());

// Serve static files (HTML, CSS, JavaScript, images, etc.) from the 'public' directory
app.use('/public', express.static(process.cwd() + '/public'));

// Define a root ('/') route handler for GET requests. This sends the 'index.html' file when someone navigates to the root of our website
app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Set the port based on an environment variable, or if there's nothing set, default to 3000. This is the port at which our server will be running
const serverPort = process.env.PORT || 3000;

// Have the Express application listen on the given port. Once the server is running, it logs a message to the console
app.listen(serverPort, function () {
  console.log('Your server is up and running on port ' + serverPort)
});
