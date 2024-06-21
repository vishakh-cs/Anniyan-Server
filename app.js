const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
    transports: ['websocket', 'polling'],
},
allowEIO3: true
});

server.prependListener("request", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
});

io.on('connection', (socket) => {
  console.log('socket is on');
  
  socket.on('chat', (message) => {
    io.emit('chat', message);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});

server.listen(3000, () => {
  console.log('server connected on port 3000');
});
