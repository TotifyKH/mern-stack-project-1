
export default class Obstacle {
  constructor(canvas){
    this.obstaclePos = Math.random()*270 + 20;
    this.top = this.obstaclePos;
    this.bottom = this.obstaclePos + 150;
    this.x = canvas.width;
    this.width = 50;
    this.color = 'green';
    this.counted = false;
  }
  draw(data){
    data.ctx.fillStyle = this.color;
    data.ctx.fillRect(this.x, 0, this.width, this.top);
    data.ctx.fillRect(this.x, this.bottom, this.width, data.canvas.height);
  }
  update(data){
    this.x -= data.gamespeed;
    this.draw({canvas: data.canvas, ctx: data.ctx});
  }
}
