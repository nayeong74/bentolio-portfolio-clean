// 벚꽃 애니메이션 스크립트
const petalCount = 30;
const petals = [];
const canvas = document.createElement('canvas');
canvas.className = 'petal-canvas';
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function Petal() {
  this.x = random(0, canvas.width);
  this.y = random(-canvas.height, 0);
  this.radius = random(8, 18);
  this.speed = random(1, 2.5);
  this.wind = random(-0.5, 0.5);
  this.angle = random(0, Math.PI * 2);
  this.spin = random(-0.02, 0.02);
}
Petal.prototype.update = function() {
  this.x += this.wind;
  this.y += this.speed;
  this.angle += this.spin;
  if (this.y > canvas.height + 20) {
    this.x = random(0, canvas.width);
    this.y = random(-20, 0);
  }
};
Petal.prototype.draw = function(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(6, -8, 14, -2, 0, this.radius);
  ctx.bezierCurveTo(-14, -2, -6, -8, 0, 0);
  ctx.fillStyle = 'rgba(255,192,203,0.7)';
  ctx.shadowColor = 'rgba(255,182,193,0.5)';
  ctx.shadowBlur = 8;
  ctx.fill();
  ctx.restore();
};
for (let i = 0; i < petalCount; i++) {
  petals.push(new Petal());
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of petals) {
    p.update();
    p.draw(ctx);
  }
  requestAnimationFrame(animate);
}
animate();
