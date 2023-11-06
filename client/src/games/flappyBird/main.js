import Bird from './bird';
import Obstacle from './obstacles';

let API_URL = process.env.REACT_APP_API_URL;

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
let gameActive = false;

//Flappybird object
const bird = new Bird();

//Sounds
const scoreSound = new Audio();
scoreSound.src = '/sounds/flappyBird/sfx_point.wav';
scoreSound.volume = 0.3;

const deathSound = new Audio();
deathSound.src = '/sounds/flappyBird/sfx_hit.wav';
deathSound.volume = 0.3;

//Pipes creation and handler
let obstacleArray = [];

//Synchronize FPS
let msPrev = window.performance.now()
const fps = 60
const msPerFrame = 1000 / fps



//Animation loop
function animate() {
  //Recursion
  let animationId = requestAnimationFrame(animate)
  const msNow = window.performance.now()
  const msPassed = msNow - msPrev

  if (msPassed < msPerFrame) return

  const excessTime = msPassed % msPerFrame
  msPrev = msNow - excessTime
  frame = (frame + 1) % 15000;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //Update Bird
  bird.update({ canvas, spacePressed, angle, frame });
  bird.draw(ctx);
  if (spacePressed === true) {
    spacePressed = false;
  }
  handleObstacles({ ctx, canvas, gamespeed, frame })

  if (handleCollisions()) {
    //Game over Logic
    cancelAnimationFrame(animationId);
    deathSound.play();
    ctx.font = '30px Arcade2';
    ctx.fillStyle = 'white';
    ctx.fillText(`GAME OVER! YOUR SCORE IS ${score}`, 100, canvas.height / 2);

    fetch(`${API_URL}/games/flappyBird/newScore`, {
      method: "post",
      headers: { 'Content-Type': "application/json" },
      body: JSON.stringify({ score }),
      credentials: 'include',
    })
      .then((result) => {
        return result.json();
      })
      .then((result_json) => {
        if (result_json.success) {
          //Update the top 10 leaderboard in the flappyBird.jsx
          // updateLeaderboardData();

        }
      })
      .catch(err => console.log(err));

    gameActive = false;
    return;
  }

  //Score
  ctx.font = '40px Arcade2';
  ctx.fillStyle = 'white';
  ctx.fillText(score, canvas.width - 50, 50);
  

}



ctx.font = '40px Arcade2';
ctx.fillStyle = 'white';
ctx.fillText(`PRESS SPACE TO START`, 170, canvas.height / 2);

//animate();

//Key listener
window.addEventListener('keydown', function (e) {
  if (e.code === 'Space' && !spacePressed) {
    if (!gameActive) {
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
  if (data.frame % 120 === 0) {
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
function handleCollisions() {
  for (let i = 0; i < obstacleArray.length; i++) {
    if (obstacleArray[i].x <= 140 && !obstacleArray[i].counted) {
      obstacleArray[i].counted = true;
      score++;
      scoreSound.play();
    }
    if ((bird.x < obstacleArray[i].x + obstacleArray[i].width &&
      bird.x + bird.width > obstacleArray[i].x) &&
      (bird.y < obstacleArray[i].top || bird.y + bird.height > obstacleArray[i].bottom)
    ) {
      return true;

    }
  }
  if (bird.y + bird.height > canvas.height - bird.height - 1 || bird.y < 0) {
    return true;
  }
  return false;
}
