export default class Bird {
  constructor(){
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.width = 25;
    this.height = 20;
    this.gravity = 0.5;
    
    //Bird Image
    this.birdImagesArray = [];
    this.imageFrame = 0;
    this.frame = 0;

    let birdImage = new Image();
    birdImage.src = '/img/flappyBird/yellowbird-upflap.png';
    this.birdImagesArray.push(birdImage);
    birdImage = new Image();
    birdImage.src = '/img/flappyBird/yellowbird-midflap.png';
    this.birdImagesArray.push(birdImage);
    birdImage = new Image();
    birdImage.src = '/img/flappyBird/yellowbird-downflap.png';
    this.birdImagesArray.push(birdImage);
    birdImage = new Image();
    birdImage.src = '/img/flappyBird/yellowbird-midflap.png';
    this.birdImagesArray.push(birdImage);
    birdImage = new Image();
    birdImage.src = '/img/flappyBird/yellowbird-upflap.png';
    this.birdImagesArray.push(birdImage);
    birdImage = new Image();
    
    //Bird sound
    this.audio = new Audio();
    this.audio.src = '/sounds/flappyBird/sfx_wing.wav';
    this.audio.volume = 0.3;
  }

  update(data){

    if(this.frame > 0)
      this.frame--;

    if(this.y > data.canvas.height - this.height){
      this.y = data.canvas.height - this.height;
      this.vy = 0;
    }else{
      this.vy += this.gravity;
      this.y += this.vy;
    }
    
    if(this.y < 0){
      this.y = 0;
    }

    if(data.spacePressed && this.y > this.height*3){ 
      this.audio.currentTime = 0;
      this.audio.play();
      this.flap()
      this.frame = 20;
      this.imageFrame = 0;
    };
    
    if( this.frame !== 0  && this.frame % 5 === 0){
      if(this.imageFrame === 4)
        this.imageFrame = 0;
      else
        this.imageFrame++;
    }
    
  }

  draw(ctx){
      ctx.drawImage(this.birdImagesArray[this.imageFrame], this.x, this.y);
    // ctx.fillStyle = 'red';
    // ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  flap(){
    this.vy = -10;
  }
}

