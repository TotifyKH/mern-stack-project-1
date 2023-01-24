const mongoose = require('mongoose');

const Pong2RoomSchema = new mongoose.Schema({
  players:{
    type: Number,
    required: true,
    integer: true,
    max: 2,
  },
  roomId:{
    type: Number,
    required: true,
    integer: true,
  }
});

const Pong2Room = mongoose.model('Pong2Room', Pong2RoomSchema);

module.exports = Pong2Room;
