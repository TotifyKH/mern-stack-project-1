export default class Bird {
  constructor(){
    this.x = 150;
    this.y = 200;
    this.vy = 0;
    this.width = 20;
    this.height = 20;
    this.gravity = 0.5;
  }

  update(data){
    
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
      this.flap()
      console.log('flap');
    };
    
    
  }

  draw(ctx){
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  flap(){
    this.vy = -10;
  }
}

