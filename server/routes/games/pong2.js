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
        req.session.playerId = 2;
        room.players++;
        room.save();
        setTimeout(() => {
          req.app.io.emit(`${roomId}:start-game`);
        }, 3000); // add a 5 second delay
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

router.post('/leaveRoom', (req, res) => {
  Pong2Room.findOne({roomId: req.session.pong2RoomId})
  .then((room) => {
    if (!room) {
      // The room doesn't exist
      return null;
    }
    room.players--;
    return room.save();
  })
  .then((room) => {
    if (!room) {
      // The room doesn't exist, so no need to delete it
      return;
    }
    if (room.players == 0){
      // Delete the room if it's empty
      Pong2Room.deleteOne({roomId: room.roomId})
        .then(() => {
          console.log(`Deleted room ${room.roomId}`);
          delete req.session.pong2RoomId;
          delete req.session.playerId;
          res.json({success: true});
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      // The room still has players, so just save it
      return room.save();
    }
  })
  .catch(err => {
    console.log(err);
  });

})

router.post('/createRoom', async (req, res) => {
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
      req.session.playerId = 1;
    })
    .then((result) => {
      res.json(roomId);
    })
    .catch((err) => {
      console.log(err);
    });
})

module.exports = router;
