const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const [padHeight, padWidth] = [10, 75];

let [x, y] = [canvas.width / 2, canvas.height - 30];
let ballRadius = 10;
let ballHitBox = ballRadius / 2;
let [dx, dy] = [2, -1];
let [bX, bY] = [ballHitBox - 8, ballHitBox - 8];

const [brickRows, brickCols] = [3, 5];
const [brickHeight, brickWidth] = [20, 75];
const [brickOffsetTop, brickOffsetLeft] = [30, 30];
const brickPadding = 10;

let padX = (canvas.width - padWidth) / 2;
let [r_press, l_press] = [false, false];

let score = 0;

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, 2*Math.PI);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}

function drawPad() {
  ctx.beginPath();
  ctx.rect(padX, canvas.height - padHeight, padWidth, padHeight);
  ctx.fillStyle = "#DD9500";
  ctx.fill();
  ctx.closePath();
}

function drawBrick(x, y) {
  ctx.beginPath();
  ctx.rect(x, y, brickWidth, brickHeight);
  ctx.fillStyle = "#008880";
  ctx.fill();
  ctx.closePath();
}

function buildWall() {
  const bricks = [];
  for (let c = 0; c < brickCols; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRows; r++) {
      bricks[c][r] = { x: 0, y: 0, state: 1 };
    }
  }

  return bricks;
}

function drawWall() {
  for (let c = 0; c <  brickCols; c++) {
    for (let r = 0; r < brickRows; r++) {
      if (wall[c][r].state === 1) {
        const newBrickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
        const newBrickY = r * (brickHeight + brickPadding) + brickOffsetTop;

        wall[c][r].x = newBrickX;
        wall[c][r].y = newBrickY;

        drawBrick(newBrickX, newBrickY);
      }
    }
  }
}

function drawScore() {
  ctx.font = "13px Times New Roman Bold";
  ctx.fillStyle = "#000000";
  ctx.fillText(`Score: ${score}`, 8, 24);
}

function collisionBall() {
  if (y + bY < ballRadius) {
    dy = -dy;
  }
  if (x + bX < ballRadius || x + bX > canvas.width - ballRadius) {
    dx = -dx;
  }

  if ((x > padX && x < padX + padWidth) && (y + bY > canvas.height - padHeight - ballRadius)) {
    dy = -0.52 - dy;
  } else if (y + bY > canvas.height - ballRadius) {
    alert("GAME OVER!");
    document.location.reload();
    clearInterval(interval);
  }
}

function collisionWall() {
  for (let c = 0; c < brickCols; c++) {
    for (let r = 0; r < brickRows; r++) {
      if (wall[c][r].state == 1) {
        if (x > wall[c][r].x && x < wall[c][r].x + brickWidth &&
            y > wall[c][r].y && y < wall[c][r].y + brickHeight) {
          console.log("Working");
          wall[c][r].state = 0;
          dy = -0.13 - dy;
          score++;

          if (score === brickRows * brickCols) {
            setTimeout(
              function() {
                alert("You Win!");
                document.location.reload();
                clearInterval(interval);
              },
              2000
            );
          }
        }
      }
    }
  }
}

function keyDownHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    r_press = true;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    l_press = true;
  }
}

function keyUpHandler(e) {
  if (e.key == "Right" || e.key == "ArrowRight") {
    r_press = false;
  } else if (e.key == "Left" || e.key == "ArrowLeft") {
    l_press = false;
  }
}

function padEvent() {
  if (r_press) {
    padX = Math.min(padX + 7, canvas.width - padWidth);
  } else if (l_press) {
    padX = Math.max(padX - 7, 0);
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

let wall = buildWall();

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPad();
  drawWall();

  collisionBall();
  collisionWall();
  padEvent();

  drawScore();

  x += 0.5*dx;
  y += 0.75*dy;
}

const interval = setInterval(draw, 10);
