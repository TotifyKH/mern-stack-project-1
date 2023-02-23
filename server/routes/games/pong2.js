const express = require('express');
const router = express.Router();
const Pong2Room = require('../../models/Pong2/Room');


router.get('/', (req, res) => {
  res.send('You have reached the Pong2 Route');
});

router.get('/checkAvailableRoom', (req, res) => {
  let availableRoom = Pong2Room.find();
  res.send(availableRoom);
})

router.post('/joinRoom', (req, res) => {
  let {roomId} = req.body;
  console.log(roomId);
  Pong2Room.findOne({roomId})
  .then((room) => {
    if(room){
      if(room.players == 2){
        //room is full
        res.json({roomStatus: 1})
      }else{
        //Room available to join
        req.session.pong2RoomId = roomId;
        room.players++;
        room.save();
        res.json({roomStatus: 0})
        //increment the players count of this room room.players++ and update in the database;
      }
    }else{
      //Room doesn't exists
      res.json({roomStatus: -1})
    }
  })
  .catch((err) => {
    console.log(err);
  })
})

router.post('/createRoom', async (req, res) => {
  console.log('reached this route');
  let roomId;
  let uniqueId = false;
  //Loop and check for a uniqueId
  do {
    roomId = Math.floor(Math.random() * 900000) + 100000;
    let room = await Pong2Room.findOne({ roomId: roomId });
    if (room) {
      console.log('room already exists');
    } else {
      uniqueId = true;
    }
  } while (!uniqueId)

  let newRoom = new Pong2Room({
    players: 1,
    roomId,
  })
  newRoom.save()
    .then((result) => {
      req.session.pong2RoomId = roomId;
    })
    .then((result) => {
      res.json(roomId);
    })
    .catch((err) => {
      console.log(err);
    });
})

module.exports = router;
