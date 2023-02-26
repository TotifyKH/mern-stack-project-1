import Player from "./player";
import io from 'socket.io-client';
import axios from 'axios';

let API_URL = process.env.REACT_APP_API_URL;
const socket = io(API_URL);

let room = -1;
let playerId = 0;
//Load Scripts
axios.get(`${API_URL}/users/status`, { withCredentials: true })
.then((result) => {
  if(result.data.pong2RoomId){
    room = result.data.pong2RoomId;
    let pong2Room = document.getElementById('pong2-room');
    let roomNumber = document.getElementById('pong2-room-number');
    let roomButton = document.getElementById('pong2-button');
    roomNumber.textContent = `Room: ${room}`;
    pong2Room.style.display = 'block';
    roomButton.style.display = 'none';
    //set playerId
    playerId = result.data.playerId;
    //Socket listening
    socket.on(`${room}:start-game`, () => {
      console.log('start the game');
      gameActive = true;
      setTimeout(() => {
        animate();
      }, 1000);
    })
    //Updating gameState
    socket.on("gameState", () => {
      console.log('gameState');
    })
  }
})

.catch(err => {
  console.log(err);
})

//Socket Listening


//Create or Join Room
let createButton = document.getElementById('create-pong2-room');
let joinButton = document.getElementById('join-pong2-room');
let leaveButton = document.getElementById('leave-pong2-room');

createButton.onclick = () => {
  axios.post(`${API_URL}/games/pong2/createRoom`,{name: 'a'},{withCredentials: true})
  .then((result) => {
    console.log(result.data);
    socket.emit('test');
    window.location.href = '/games/pong2';
  })
  .catch((err) => console.log(err));
}

leaveButton.onclick = () => {
  axios.post(`${API_URL}/games/pong2/leaveRoom`,{name: 'a'},{withCredentials: true})
  .then((result) => {
    console.log(result.data);
    window.location.href = '/games/pong2';
  })
  .catch((err) => console.log(err));
}

joinButton.onclick = () => {
  let inputRoomId = document.getElementById('pong2-roomId');
  let roomId = inputRoomId.value;
  axios.post(`${API_URL}/games/pong2/joinRoom`,{roomId},{withCredentials: true})
  .then((result) => {
    if(result.data.roomStatus == -1){
      alert("Room doesn't exist");
    }else if(result.data.roomStatus == 1){
      alert("Room is full");
    }else{
      window.location.href = '/games/pong2';
    }
  })
  .catch((err) => console.log(err));
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
  frame++;
  if(frame > 15000){
    frame = 0;
  }
  // game logic goes here
  player1.draw(ctx);
  player2.draw(ctx);
  
  if(gameActive)
    requestAnimationFrame(animate);
}

//Key Listener
window.addEventListener('keydown', function (e) {
  if (e.code === 'KeyS') {
    e.preventDefault();
    if(playerId == 1){
      player1.y += 5;
    }else{
      player2.y += 5;
    }
  }

  if (e.code === 'KeyW') {
    e.preventDefault();
    if(playerId == 1){
      player1.y -= 5;
    }else{
      player2.y -= 5;
    }
  }
});

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
  if(!gameActive)
    requestAnimationFrame(loadingScreen);
}

if(gameActive){
  animate();
}else{
  loadingScreen();
}
