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

router.post('/createRoom', (req, res) => {
  let newRoom = new Pong2Room({
    players: 1,
  })
  newRoom.save()
    .then((room) => {
      res.json({ room });
    })
    .catch((err) => {
      console.log(err);
    });
})

module.exports = router;
