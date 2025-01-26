const randValue = () => Math.floor(Math.random() * 255);
class ball {
  constructor(ctx, x, y, size, color, velocity) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.velocity = velocity;
    this.ctx = ctx;
    this.alpha = 1;
    this.gravity = 0.04;
    this.friction = 0.96;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
    this.ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    this.ctx.fill();
  }
  update() {
    this.draw();
    this.velocity.y += this.gravity;
    this.velocity.x *= this.friction;
    this.velocity.y *= this.friction;
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.alpha -= 0.006; // Gradual fade-out
  }
}
class Confetti {
  constructor(canvas, number) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext("2d");
    this.number = number;
    this.angle = (2 * Math.PI) / this.number;
    this.height = this.canvas.height;
    this.width = this.canvas.width;
    this.particles = [];
    this.intial();
  }
  intial() {
    for (let i = 0; i < this.number; i++) {
      const size = Math.random() + 1;
      const x = Math.random() * (this.width - size) + size;
      const y = Math.random() * (this.height - size);
      const color = `${randValue()},${randValue()},${randValue()}`;
      const speed = Math.random() * 5 + 3;
      this.particles.push(
        new ball(this.ctx, x, y, size, color, {
          x: speed * Math.cos(this.angle * i),
          y: speed * Math.sin(this.angle * i),
        })
      );
    }
  }
  animate = () => {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.particles.forEach((elm, index, arr) => {
      elm.update();
      if (elm.alpha <= 0) arr.splice(index, 1);
    });
    this.ctx.fillStyle = `rgba(0,0,0,0.1)`;
    if (this.particles.length) requestAnimationFrame(this.animate);
  };
}
