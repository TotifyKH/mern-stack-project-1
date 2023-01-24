import Player from "./player";
import io from 'socket.io-client';
import axios from 'axios';

let API_URL = process.env.REACT_APP_API_URL;
const socket = io(API_URL);

//Create or Join Room
let createButton = document.getElementById('create-pong2-room');
let joinButton = document.getElementById('join-pong2-room');

createButton.onclick = () => {
  console.log('hi');
}

joinButton.onclick = () => {
  console.log('wo');
}

//Canvas setup 
const canvas = document.getElementById('pong2-canvas');
const ctx = canvas.getContext('2d');
canvas.width = 900;
canvas.height = 500;

//Tracking variables
let frame = 0;
let gameActive =false;

const player1 = new Player(40,200);
const player2 = new Player(canvas.width-50, 200);

//Animation Loop
function animate(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  requestAnimationFrame(animate);
  frame++;
  if(frame > 15000){
    frame = 0;
  }
  // game logic goes here
  player1.draw(ctx);
  player2.draw(ctx);
}

//Loading Screen Logic
let xLoading = canvas.width/2 - 200;
let yLoading = canvas.height/2 - 10;
function loadingScreen(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  ctx.font = '30px Arcade1';
  ctx.fillStyle = 'white';
  ctx.fillText('Waiting For Players', xLoading, yLoading);
  
  if(frame > 30){
    ctx.fillText('.', xLoading + 315, yLoading);
  }
  if(frame > 60){
    ctx.fillText('.', xLoading+ 330, yLoading);
  }
  if(frame > 90){
    ctx.fillText('.', xLoading+ 345, yLoading);
  }
  frame++;
  if(frame > 120){
    frame = 0;
  }
 
  requestAnimationFrame(loadingScreen);
}

if(gameActive){
  animate();
}else{
  loadingScreen();
}
