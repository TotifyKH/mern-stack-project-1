const socketIO = require('socket.io');
const {gameLoop} = require('../helpers/pongGame');
const games = new Map();

const socket = (server, app) => {
  const io = socketIO(server, {
    cors: {
      //Add your server URI here if you deploy
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
    }
  });

  io.on('connection', (socket) => {
    // console.log(`User connected Id: ${socket.id}`);
    
    //TEST GAME LOOP
    socket.on('test', (roomId) => {
      games.set(roomId, {num: 1});
      console.log('TEST REACHED');
      const gameState = games.get(roomId);

      gameState.intervalId = setInterval(() => {
        gameLoop(io, gameState);
        if(gameState.num === 10){
          clearInterval(gameState.intervalId);
          games.delete(roomId);
        }
      }, 1000);

      
    })

    socket.on('disconnect', () => {
      // console.log(`User disconnected Id:${socket.id}`);
    });
  });

  app.io = io;
}

module.exports = socket;