const mongoose = require('mongoose');

const FlappyBirdScoresSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  score:{
    type: Number,
    required: true,
    integer: true,
  }
});

const FlappyBirdScores = mongoose.model('FlappyBirdScores', FlappyBirdScoresSchema);

module.exports = FlappyBirdScores;

