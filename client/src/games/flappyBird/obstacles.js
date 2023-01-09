
export default class Obstacle {
  constructor(canvas) {
    this.obstaclePos = Math.random() * 270 + 20;
    this.top = this.obstaclePos;
    this.bottom = this.obstaclePos + 150;
    this.x = canvas.width;
    this.width = 50;
    this.color = 'green';

    this.pipeImage = new Image();
    this.pipeImage.src = '/img/flappyBird/pipe-green.png';
    this.counted = false;
  }
  draw(data) {
    data.ctx.save();
    data.ctx.scale(1, -1); // Flip the image along the x-axis
    data.ctx.drawImage(this.pipeImage, this.x, -this.top); // Draw the image at the flipped position
    data.ctx.restore();
    // data.ctx.fillRect(this.x, this.bottom, this.width, data.canvas.height);
    data.ctx.drawImage(this.pipeImage, this.x, this.bottom);
  }
  update(data) {
    this.x -= data.gamespeed;
    this.draw({ canvas: data.canvas, ctx: data.ctx });
  }
}
