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
  },
  createdAt: { 
    type: Date, 
    default: Date.now()
  },
});

Pong2RoomSchema.index({ createdAt: 1 }, { expireAfterSeconds: 60 * 600 });

const Pong2Room = mongoose.model('Pong2Room', Pong2RoomSchema);

module.exports = Pong2Room;
