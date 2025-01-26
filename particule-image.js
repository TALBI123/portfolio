const container = document.querySelector(".hobbies-aria");
class ParticleImg {
  static countId = 1;
  constructor(parent, x, y, imgSrc, size) {
    this.container = parent;
    this.parentElement = parent.container;
    this.size = size;
    this.x = x;
    this.y = y;
    this.imgSrc = imgSrc;
    this.dirY = Math.random();
    this.dirX = Math.random();
    this.speedX = Math.random() * 3 + 0.6;
    this.speedY = Math.random() * 3 + 0.6;
    this.id = ParticleImg.countId++;
    this.createImg();
    this.img;
  }
  createImg() {
  const img = document.createElement('img');
  img.src = `./${this.imgSrc}`;
  img.className = `img${this.id}`;
  img.style.setProperty('--size',`${this.size}px`);
  img.style.setProperty('--posX',`${this.x}px`);
  img.style.setProperty('--posX',`${this.y}px`);
  this.parentElement.appendChild(img);
  this.img = img;
  }
  update() {
    if (this.x <= 0 || this.x + this.size >= this.container.width)
      this.dirX = -this.dirX;
    if (this.y <= 0 || this.y + this.size >= this.container.height)
      this.dirY = -this.dirY;

    this.x += this.dirX * this.speedX;
    this.y += this.dirY * this.speedY;
    this.img.style.setProperty("--posX", this.x + "px");
    this.img.style.setProperty("--posY", this.y + "px");
  }
}
class Boerd {
  constructor(container, imgs) {
    this.container = container;
    this.height = this.container.offsetHeight;
    this.width = this.container.offsetWidth;
    this.particlesImg = [];
    this.sizeOfImg = 50;
    this.imgs = imgs;
    this.createParticlesImg();
    window.addEventListener('resize',() => {
      this.container =  document.querySelector(".hobbies-aria");
      this.width = this.container.width;
      this.height = this.container.height;
    });
  }
  createParticlesImg() {
    this.imgs.forEach((img) => {
      const x = Math.random() * (this.width - this.sizeOfImg);
      const y = Math.random() * (this.height - this.sizeOfImg);
      this.particlesImg.push(
        new ParticleImg(this, x, y, img, this.sizeOfImg)
      );
    });
  }
  animate = () => {
    this.particlesImg.forEach((elm) => elm.update());
    requestAnimationFrame(this.animate);
  };
}
const content = new Boerd(
  container,
  Array.from({ length: 10 }, (_, index) => `img${index + 1}.png`)
);
content.animate();