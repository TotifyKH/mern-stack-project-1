const socketIO = require('socket.io');

const socket = (server, app) => {
  const io = socketIO(server, {
    cors: {
      //Add your server URI here if you deploy
      origin: ['http://localhost:3000'],
      methods: ['GET', 'POST'],
    }
  });

  io.on('connection', (socket) => {
    console.log(`User connected Id: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`User disconnected Id:${socket.id}`);
    });
  });

  app.io = io;;
}

module.exports = socket;