const canvas = document.querySelector("canvas#homeCanvas");
const ctx = canvas.getContext("2d");
const Radius = 100;
const Size = 3;
let numberOfParticules = 100;
let w = (canvas.width = window.innerWidth);
let h = (canvas.height = window.innerHeight);
let Particules = [];
const rand = (value) => Math.floor(Math.random() * value);
class Particule {
  constructor(x, y, size, dirX, dirY, color) {
    this.x = x;
    this.y = y;
    this.dirX = dirX;
    this.dirY = dirY;
    this.size = size;
    this.color = color;
    this.speedx = Math.random() * 3 + 1;
    this.speedy = Math.random() * 4 + 1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
  update() {
    if (this.x + this.size > w || this.x - this.size < 0)
      this.dirX = -this.dirX;
    if (this.y + this.size > h || this.y - this.size < 0)
      this.dirY = -this.dirY;
    this.x += this.dirX * this.speedx;
    this.y += this.dirY * this.speedy;
  }
}
const creatElement = () => {
  if (w < 400) {
    numberOfParticules *= 1/2;
  }
  for (let i = 0; i < numberOfParticules; i++) {
    const size = rand(Size) + 0.5;
    const x = rand(w - 2 * size) + size;
    const y = rand(h - 2 * size) + size;
    const dirX = rand(2) + 0.5;
    const dirY = rand(2) + 0.5;
    const color = "azure";
    Particules.push(new Particule(x, y, size, dirX, dirY, color));
    Particules[i].draw();
  }
};
creatElement();
function connect() {
  for (let i = 0; i < Particules.length; i++) {
    for (let j = i+1; j < Particules.length; j++) {
      const dx = Particules[i].x - Particules[j].x;
      const dy = Particules[i].y - Particules[j].y;
      const distance = Math.hypot(dy, dx);
      if (distance <= 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(250,250,250,${1 - distance / 100})`;
        ctx.moveTo(Particules[i].x, Particules[i].y);
        ctx.lineTo(Particules[j].x, Particules[j].y);
        ctx.stroke();
      }
    }
  }
}
function animation() {
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "rgba(0,0,0,0.1)";
  connect();
  Particules.forEach((elm) => {
    elm.update();
    elm.draw();
  });
  requestAnimationFrame(animation);
}
function resize() {
  w = canvas.width = window.innerWidth;
  h = canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);
animation();