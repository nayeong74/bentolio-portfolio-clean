// WOODZ 음악 분위기에 맞는 음표 애니메이션
const noteCount = 25;
const notes = [];
const noteSymbols = ['\u266B','\u266A','\u266C','\u2669'];
const colors = ['#F8AFA6','#FADCD9','#B2A4FF','#FFC7EA','#FFB4B4'];
const canvas = document.querySelector('.petal-canvas') || (() => {
  const c = document.createElement('canvas');
  c.className = 'petal-canvas';
  document.body.appendChild(c);
  return c;
})();
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

function Note() {
  this.x = random(0, canvas.width);
  this.y = random(-canvas.height, 0);
  this.size = random(28, 48);
  this.speed = random(1, 2.3);
  this.wind = random(-0.8, 0.8);
  this.angle = random(0, Math.PI * 2);
  this.spin = random(-0.01, 0.01);
  this.symbol = noteSymbols[Math.floor(random(0, noteSymbols.length))];
  this.color = colors[Math.floor(random(0, colors.length))];
  this.alpha = random(0.7, 1);
}
Note.prototype.update = function() {
  this.x += this.wind;
  this.y += this.speed;
  this.angle += this.spin;
  if (this.y > canvas.height + 40) {
    this.x = random(0, canvas.width);
    this.y = random(-40, 0);
  }
};
Note.prototype.draw = function(ctx) {
  ctx.save();
  ctx.translate(this.x, this.y);
  ctx.rotate(this.angle);
  ctx.globalAlpha = this.alpha;
  ctx.font = `${this.size}px serif`;
  ctx.fillStyle = this.color;
  ctx.fillText(this.symbol, 0, 0);
  ctx.restore();
};
notes.length = 0;
for (let i = 0; i < noteCount; i++) {
  notes.push(new Note());
}
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let n of notes) {
    n.update();
    n.draw(ctx);
  }
  requestAnimationFrame(animate);
}
animate();
