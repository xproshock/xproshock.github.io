const canvas = document.getElementById('pong');
const ctx = canvas.getContext('2d');

// Constants
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 80;
const BALL_SIZE = 12;
const PLAYER_X = 20;
const AI_X = canvas.width - 20 - PADDLE_WIDTH;
const PADDLE_SPEED = 6;

// State
let playerY = canvas.height / 2 - PADDLE_HEIGHT / 2;
let aiY = canvas.height / 2 - PADDLE_HEIGHT / 2;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
let ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);

// Mouse controls
canvas.addEventListener('mousemove', function(e) {
  const rect = canvas.getBoundingClientRect();
  playerY = e.clientY - rect.top - PADDLE_HEIGHT / 2;
  playerY = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, playerY));
});

// Draw everything
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw paddles
  ctx.fillStyle = '#fff';
  ctx.fillRect(PLAYER_X, playerY, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(AI_X, aiY, PADDLE_WIDTH, PADDLE_HEIGHT);

  // Draw ball
  ctx.beginPath();
  ctx.arc(ballX, ballY, BALL_SIZE / 2, 0, Math.PI * 2);
  ctx.fill();

  // Draw net
  for (let i = 0; i < canvas.height; i += 20) {
    ctx.fillRect(canvas.width / 2 - 1, i, 2, 10);
  }
}

// Update game state
function update() {
  // Move ball
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Wall collision
  if (ballY < BALL_SIZE / 2 || ballY > canvas.height - BALL_SIZE / 2) {
    ballSpeedY *= -1;
  }

  // Player paddle collision
  if (
    ballX - BALL_SIZE / 2 < PLAYER_X + PADDLE_WIDTH &&
    ballY > playerY &&
    ballY < playerY + PADDLE_HEIGHT
  ) {
    ballSpeedX *= -1;
    ballX = PLAYER_X + PADDLE_WIDTH + BALL_SIZE / 2; // Avoid sticking
  }

  // AI paddle collision
  if (
    ballX + BALL_SIZE / 2 > AI_X &&
    ballY > aiY &&
    ballY < aiY + PADDLE_HEIGHT
  ) {
    ballSpeedX *= -1;
    ballX = AI_X - BALL_SIZE / 2; // Avoid sticking
  }

  // Score left/right (reset ball)
  if (ballX < 0 || ballX > canvas.width) {
    ballX = canvas.width / 2;
    ballY = canvas.height / 2;
    ballSpeedX = 5 * (Math.random() > 0.5 ? 1 : -1);
    ballSpeedY = 3 * (Math.random() > 0.5 ? 1 : -1);
  }

  // AI paddle follows ball (basic AI)
  if (aiY + PADDLE_HEIGHT / 2 < ballY - 10) {
    aiY += PADDLE_SPEED;
  } else if (aiY + PADDLE_HEIGHT / 2 > ballY + 10) {
    aiY -= PADDLE_SPEED;
  }
  aiY = Math.max(0, Math.min(canvas.height - PADDLE_HEIGHT, aiY));
}

// Main loop
function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();
