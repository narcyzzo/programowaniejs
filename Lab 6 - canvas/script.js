const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const balls = [];
const minDistance = 100;
const maxSpeed = 3;
const attractionForce = 0.02;
const repulsionForce = 0.05;

let mouseX;
let mouseY;

function getRandomSpeed() {
  return (Math.random() - 0.5) * maxSpeed * 2;
}

function Ball(x, y, dx, dy, radius, color) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.color = color;

  this.draw = function() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  this.update = function() {
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  for (let i = 0; i < 10; i++) {
    const radius = Math.random() * 20 + 10;
    let x = Math.random() * (canvas.width - radius * 2) + radius;
    let y = Math.random() * (canvas.height - radius * 2) + radius;
    let dx = getRandomSpeed();
    let dy = getRandomSpeed();
    const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;

    balls.push(new Ball(x, y, dx, dy, radius, color));
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < balls.length; i++) {
    balls[i].update();
    for (let j = i + 1; j < balls.length; j++) {
      const distance = Math.sqrt(Math.pow(balls[j].x - balls[i].x, 2) + Math.pow(balls[j].y - balls[i].y, 2));
      if (distance < minDistance) {
        ctx.beginPath();
        ctx.moveTo(balls[i].x, balls[i].y);
        ctx.lineTo(balls[j].x, balls[j].y);
        ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
        ctx.stroke();
        ctx.closePath();
      }
    }
  }

  ctx.fillStyle = 'black';
  ctx.fillText(`Balls: ${balls.length}`, 10, 20);
}

function updateMousePosition(event) {
  const rect = canvas.getBoundingClientRect();
  mouseX = event.clientX - rect.left;
  mouseY = event.clientY - rect.top;
}

function applyMouseForce(ball) {
  const distanceX = mouseX - ball.x;
  const distanceY = mouseY - ball.y;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  const forceX = distanceX / distance;
  const forceY = distanceY / distance;

  if (distance < 100) {
    ball.dx -= forceX * attractionForce;
    ball.dy -= forceY * attractionForce;
  } else if (distance < 200) {
    ball.dx += forceX * repulsionForce;
    ball.dy += forceY * repulsionForce;
  }
}

function removeBall(event) {
  const clickedX = event.clientX - canvas.getBoundingClientRect().left;
  const clickedY = event.clientY - canvas.getBoundingClientRect().top;

  for (let i = 0; i < balls.length; i++) {
    const distance = Math.sqrt(Math.pow(clickedX - balls[i].x, 2) + Math.pow(clickedY - balls[i].y, 2));
    if (distance < balls[i].radius) {
      balls.splice(i, 1);
      const radius = Math.random() * 20 + 10;
      let x = Math.random() * (canvas.width - radius * 2) + radius;
      let y = Math.random() * (canvas.height - radius * 2) + radius;
      let dx = getRandomSpeed();
      let dy = getRandomSpeed();
      const color = `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`;
      balls.push(new Ball(x, y, dx, dy, radius, color));
      balls.push(new Ball(x, y, -dx, -dy, radius, color));
      break;
    }
  }
}

function startAnimation() {
  animate();
}

function reset() {
  balls.length = 0;
  init();
  animate();
}

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  reset();
});

canvas.addEventListener('mousemove', updateMousePosition);
canvas.addEventListener('click', removeBall);
document.getElementById('startBtn').addEventListener('click', startAnimation);
document.getElementById('resetBtn').addEventListener('click', reset);

init();
animate();
