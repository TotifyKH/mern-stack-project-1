export default class Player {
  constructor(x, y){
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 80;
    this.score = 0;
  }

  update(){

  }

  draw(ctx){
    ctx.fillStyle = 'white';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}