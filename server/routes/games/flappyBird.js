const express = require('express');
const router = express.Router();



router.get('/', (req, res, next) => {
    res.send('You have reached the Flappy Bird Route');
});

router.post('/newScore', (req, res, next) => {
  let {score} = req.body;
  console.log(score);
})

module.exports = router;