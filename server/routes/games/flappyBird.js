const express = require('express');
const router = express.Router();
const FlappyBirdScores = require('../../models/FlappyBirdScores');



router.get('/', (req, res, next) => {
    res.send('You have reached the Flappy Bird Route');
});

router.get('/getTopScores', async(req, res, next) => {
  let topScores = await FlappyBirdScores.find()
    .sort({score: -1})
    .limit(10);
  res.json(topScores);
})

router.post('/newScore', async(req, res, next) => {
  let {score} = req.body;
  let name = 'Totify';

  let topScores = await FlappyBirdScores.find()
    .sort({score: -1})
    .limit(10);

  if(topScores.length < 10 || score > topScores[topScores.length - 1].score){
    let newScore = new FlappyBirdScores({
      name: name,
      score: score,
    })
    newScore.save();
    res.json({success: true});
    console.log("New Score added");
  }else{
    res.json({success: false});
  }
  
})

module.exports = router;