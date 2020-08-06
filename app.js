import GlowParticle from "./glowParticle.js";

const COLORS = [
  {
    r: 45,
    g: 74,
    b: 227,
  },
  {
    r: 250,
    g: 255,
    b: 89,
  },
  {
    r: 44,
    g: 104,
    b: 248,
  },
  {
    r: 44,
    g: 209,
    b: 252,
  },
  {
    r: 54,
    g: 233,
    b: 84,
  },
];

function App() {
  this.canvas = document.createElement("canvas");
  document.body.appendChild(this.canvas);
  this.ctx = this.canvas.getContext("2d");

  this.devicePixelRatio = window.devicePixelRatio > 1 ? 2 : 1;

  //controller
  this.totalParticles = 15;
  this.particles = [];
  this.maxRadius = 90 * 7;
  this.minRadius = 40 * 7;

  const createParticles = () => {
    let curColor = 0;
    this.particles = [];

    for (let i = 0; i < this.totalParticles; i++) {
      const item = new GlowParticle(
        Math.random() * this.stageWidth,
        Math.random() * this.stageHeight,
        Math.random() * (this.maxRadius - this.minRadius) + this.minRadius,
        COLORS[curColor]
      );

      if (++curColor >= COLORS.length) {
        curColor = 0;
      }

      this.particles[i] = item;
    }
  };

  const resize = () => {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth * this.devicePixelRatio;
    this.canvas.height = this.stageHeight * this.devicePixelRatio;
    this.ctx.scale(this.devicePixelRatio, this.devicePixelRatio);

    this.ctx.globalCompositeOperation = "saturation";

    createParticles();
  };

  const animate = () => {
    window.requestAnimationFrame(animate);

    this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);

    for (let i = 0; i < this.totalParticles; i++) {
      const item = this.particles[i];
      item.animate(this.ctx, this.stageWidth, this.stageHeight);
    }
  };

  window.addEventListener("resize", resize);
  resize();

  window.requestAnimationFrame(animate);
}

window.onload = () => new App();
