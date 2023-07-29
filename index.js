// Import all the necessary packages and modules
const express = require('express');
const cors = require('cors');
const multer = require('multer');
require('dotenv').config();

// Initiate an instance of Express
const server = express();

// Enable Cross-Origin Resource Sharing to support requests from different domains, making the API publicly accessible
server.use(cors());

// Set the 'public' directory to serve static files
server.use('/public', express.static(process.cwd() + '/public'));

// Define route for the homepage 
server.get('/', function (request, response) {
  // Send the HTML file located in the 'views' directory to be displayed in the user's browser
  response.sendFile(process.cwd() + '/views/index.html');
});

// Configure Multer, a middleware for handling HTTP requests with 'Content-Type' of 'multipart/form-data', for file upload
const fileUpload = multer({ dest: 'uploads/' });

// Define a route to handle file upload through POST request
server.post('/api/fileanalyse', fileUpload.single('upfile'), function (request, response) {
  
  // If no file is uploaded by the user, an error is responded back
  if (!request.file) {
    return response.status(400).json({ error: 'No file was uploaded.' });
  }

  // Extract file properties
  const fileName = request.file.originalname;
  const fileType = request.file.mimetype;
  const fileSize = request.file.size;

  // Response is sent back to the user with the file properties in a JSON object
  response.json({ name: fileName, type: fileType, size: fileSize });
});

// Define the port number for the server and start listening to requests
const portNumber = process.env.PORT || 3000;
server.listen(portNumber, function () {
  console.log('Your server is up and running on port ' + portNumber);
});
