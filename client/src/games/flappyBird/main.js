import Bird from './bird';
import Obstacle from './obstacles';

//Canvas setup 
const canvas = document.getElementById('flappyBird-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 500;

//Tracking variables
let spacePressed = false;
let angle = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;
let gameActive = true;

//Flappybird object
const bird = new Bird();
//Pipes creation and handler
let obstacleArray = [];

//Animation loop
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //Update Bird
  bird.update({ canvas, spacePressed, angle });
  bird.draw(ctx);
  if (spacePressed === true) {
    spacePressed = false;
  }
  handleObstacles({ ctx, canvas, gamespeed, frame })
  if(handleCollisions()){
    console.log('Game over');
    ctx.font = '30px Georgia';
    ctx.fillStyle = 'black';
    ctx.fillText(`GAME OVER! YOUR SCORE IS ${score}`, 100, canvas.height/2);
    gameActive = false;
    return;
  }

  //Score
  ctx.font = '40px Georgia';
  ctx.fillStyle = 'black';
  ctx.fillText(score, canvas.width - 50, 50);
  //Recursion
  requestAnimationFrame(animate);
  frame++;
  if(frame > 15000){
    frame = 0;
  }
}

animate();

//Key listener
window.addEventListener('keydown', function (e) {
  if (e.code === 'Space' && !spacePressed) {
    if(!gameActive){
      //NEW GAME
      score = 0;
      bird.y = 200;
      obstacleArray = [];
      gameActive = true;
      animate();

    }
    e.preventDefault();
    if (e.repeat) return; // Do nothing
    spacePressed = true;
  }
});



function handleObstacles(data) {
  if (data.frame % 150 === 0) {
    obstacleArray.unshift(new Obstacle(data.canvas));
  }
  for (let i = 0; i < obstacleArray.length; i++) {
    obstacleArray[i].update({ ctx: data.ctx, canvas: data.canvas, gamespeed: data.gamespeed });
  }
  if (obstacleArray.length > 20) {
    obstacleArray.pop();
  }
}

// Collision Detection
function handleCollisions(){
  for(let i = 0; i < obstacleArray.length; i++){
    if(obstacleArray[i].x <= 100 && !obstacleArray[i].counted){
      obstacleArray[i].counted = true;
      score++;
    }
    if((bird.x < obstacleArray[i].x + obstacleArray[i].width &&
      bird.x + bird.width > obstacleArray[i].x) &&
      (bird.y < obstacleArray[i].top || bird.y + bird.height > obstacleArray[i].bottom) 
      ){    
        return true;
       
      }
  }
  if(bird.y + bird.height > canvas.height - bird.height - 1 || bird.y < 0){
    return true;
  }
  return false;
}
