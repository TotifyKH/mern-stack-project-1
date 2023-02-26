function gameLoop(io, gameState){
  gameState.num++;
  console.log('ayy');
  io.emit('gameState', gameState.num);
}

module.exports = {gameLoop};