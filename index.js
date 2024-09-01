const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Rota básica
app.get('/', (req, res) => {
    res.send('Servidor rodando com Express e Socket.IO');
});

const gameState = {
    // Initialize your game state here
  };
  
io.on('connection', (socket) => {
    console.log('Novo cliente conectado');

    // Send current game state to the newly connected client
    socket.emit('gameState', gameState);

    // Handle game actions
    socket.on('gameAction', (action) => {
        // Update game state based on the action
        // This is where you'd implement your game logic
        
        // Broadcast updated state to all clients
        io.emit('gameState', gameState);
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
        // Handle player disconnection
    });
});

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
