const express = require('express');
const router = express.Router();
const FlappyBirdScores = require('../../models/FlappyBirdScores');
const io = require('socket.io');


router.get('/', (req, res, next) => {
    res.send('You have reached the Flappy Bird Route');
});

router.get('/getTopScores', async(req, res) => {
  let topScores = await FlappyBirdScores.find()
    .sort({score: -1})
    .limit(10);
  res.json(topScores);
})

router.post('/newScore', async(req, res) => {
  let {score} = req.body;
  let name = 'User101';

  let topScores = await FlappyBirdScores.find()
    .sort({score: -1})
    .limit(10);

  if(topScores.length < 10 || score > topScores[topScores.length - 1].score){
    let newScore = new FlappyBirdScores({
      name: name,
      score: score,
    })
    newScore.save();

    //Delete old scores
    FlappyBirdScores.deleteMany({ score: { $lt: topScores[topScores.length - 1].score } })
    .then((result) => console.log('scores deleted: '+ result.deletedCount))
    .catch(err => console.log(err));
    
    req.app.io.emit('update-flappy-bird-score');
    res.json({success: true});
    console.log("New Score added");
  }else{
    res.json({success: false});
  }
  
})

module.exports = router;