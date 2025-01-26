class Symbol {
  constructor(ctx, x, y, color, symbol, rect) {
    this.ctx = ctx;
    this.x = rect.w / 2;
    this.y = rect.h;
    this.color = color;
    this.symbol = symbol;
    this.isArrived = false;
    this.baseX = x;
    this.baseY = y;
    this.speedX = 0;
    this.speedY = 0;
    this.random = Math.random() * 20 + 10;
  }
  draw() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillText(this.symbol, this.x, this.y);
  }
  update() {
    this.speedX = (this.baseX - this.x) / this.random;
    this.speedY = (this.baseY - this.y) / this.random;
    this.x += this.speedX;
    this.y += this.speedY;
    if (
      Math.abs(this.baseX - this.x) < 0.1 &&
      Math.abs(this.baseY - this.y) < 0.1
    )
      this.isArrived = true;
    this.draw();
  }
}
class AsciiArt {
  constructor(canvas, img, cellSize) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.img = img;
    this.pixels = [];
    this.cellSize = cellSize;
    this.notStoped = true;
    this.init();
  }
  createToSymbol(value) {
    if (value < 40) return "i";
    else if (value < 80) return "n";
    else if (value < 140) return "z";
    else if (value < 200) return "a";
    else if (value < 220) return "c";
    else if (value < 240) return "*";
    else return "x";
  }
  init() {
    this.ctx.clearRect(0,0,this.width,this.height);
    this.ctx.drawImage(this.img, 0, 0, this.width, this.height);
    const pixel = this.ctx.getImageData(0, 0, this.width, this.height).data;
    for (let y = 0; y < this.height; y += this.cellSize) {
      for (let x = 0; x < this.width; x += this.cellSize) {
        const index = (y * this.width + x) * 4;
        if (pixel[index + 3] > 128) {
          const red = pixel[index];
          const blue = pixel[index + 1];
          const green = pixel[index + 2];
          const color = `rgb(${red},${blue},${green})`;
          const symbol = this.createToSymbol((red + green + blue) / 3);
          this.pixels.push(
            new Symbol(this.ctx, x, y, color, symbol, {
              w: this.width,
              h: this.height,
            })
          );
        }
      }
    }
  }
  reset(){
    this.notStoped = true;
    this.pixels = [];
    this.init();
    this.animate();
  }
  animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.pixels.forEach((pixel) => pixel.update());
    if (!this.pixels.every((pixel) => pixel.isArrived) && this.notStoped) {
      requestAnimationFrame(this.animate);
    } 
  };
}