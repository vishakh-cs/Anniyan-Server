const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {},
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);
  
  socket.on('chat', (message) => {
    io.emit('chat', message); // Broadcast message to all connected clients
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
