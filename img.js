const canvasImg = document.querySelector(".img-profile");
class Cell {
  constructor(classImg, x, y) {
    this.classImg = classImg;
    this.x = x;
    this.y = y;
    this.width = this.classImg.cellWidth;
    this.height = this.classImg.cellHeight;
    this.baseX = this.x;
    this.baseY = this.y;
    this.positionX = this.classImg.width / 2;
    this.positionY = 0;
    this.random = Math.random() * 20 + 3;
  }
  createPartOfImg() {
    const sx = (this.x / this.classImg.width) * this.classImg.img.width;
    const sy = (this.y / this.classImg.height) * this.classImg.img.height;
    const sw = (this.width / this.classImg.height) * this.classImg.img.width;
    const sh = (this.height / this.classImg.height) * this.classImg.img.height;
    this.classImg.ctx.drawImage(
      this.classImg.img,
      sx,
      sy,
      sw,
      sh,
      this.positionX,
      this.positionY,
      this.width,
      this.height
    );
    this.positionX += (this.x - this.positionX) / this.random;
    this.positionY += (this.y - this.positionY) / this.random;
  }
}
class transformImageToCells {
  constructor(canvas, img) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.cellWidth = this.width / 35;
    this.cellHeight = this.height / 35;
    this.img = img;
    this.animationFrameId = null;
    this.areStoped = true;
    this.mouse = {
      x: undefined,
      y: undefined,
      radius: 100,
    };
    this.arrCells = [];
    this.createCells();
  }
  createCells() {
    for (let y = 0; y < this.height; y += this.cellHeight) {
      for (let x = 0; x < this.width; x += this.cellWidth)
        this.arrCells.push(new Cell(this, y, x));
    }
  }
  render() {
    this.arrCells.forEach((cell) => cell.createPartOfImg());
  }
  animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.render();
    this.arrCells.forEach((cell) => {
      if (
        Math.abs(cell.positionX - cell.baseX) > 0.1 ||
        Math.abs(cell.positionY - cell.baseY) > 0.1
      )
        this.areStoped = false;
    });
    if (this.areStoped) {
      return;
    }
    this.areStoped = true;
    this.animationFrameId = requestAnimationFrame(this.animate);
  };
  stopAnimation = () => {
    cancelAnimationFrame(this.animationFrameId);
  };
}
const img = new Image();
img.src = "./man.png";
const sperateImg = new transformImageToCells(canvasImg, img);
sperateImg.animate();