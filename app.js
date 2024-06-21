const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors'); // Import cors middleware
require('dotenv').config();

const app = express();
const server = http.createServer(app);

// Set CORS options
const corsOptions = {
  origin: process.env.CLIENT_URL, // Replace with your client's URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
};

// Use CORS middleware
app.use(cors(corsOptions));

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('socket is on');
  
  socket.on('chat', (message) => {
    io.emit('chat', message);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`server connected on port ${PORT}`);
});
