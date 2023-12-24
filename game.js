const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const cWidth = (canvas.width = 500);
const cHeight = (canvas.height = 500);
const snakeBox = 20;
const totalMoves = cWidth / snakeBox;
//difine snake
let snake = [];
snake[0] = {
  x: 9 * snakeBox,
  y: 10 * snakeBox,
};
//score
let score = 0;
let dir = "";
let X = Math.floor(Math.random() * (totalMoves - 2 - 3) + 3) * snakeBox;
let Y = Math.floor(Math.random() * (totalMoves - 2 - 3) + 3) * snakeBox;

document.addEventListener("keyup", (event) => {
  if (event.code === "ArrowLeft" && dir != "RIGHT") {
    dir = "LEFT";
  } else if (event.code === "ArrowUp" && dir != "DOWN") {
    dir = "UP";
  } else if (event.code === "ArrowRight" && dir != "LEFT") {
    dir = "RIGHT";
  } else if (event.code === "ArrowDown" && dir != "UP") {
    dir = "DOWN";
  }
});

//display snake
// snake Directions
function displaySnake() {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, cHeight, cHeight);
  for (let i = 0; i < snake.length; ++i) {
    ctx.strokeStyle = "black";
    ctx.strokeRect(snake[i].x, snake[i].y, snakeBox, snakeBox);
    ctx.fillStyle = i == 0 ? "yellow" : "green";
    ctx.fillRect(snake[i].x, snake[i].y, snakeBox, snakeBox);
  }
  apple();
//movement
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
  if (dir == "LEFT") snakeX -= snakeBox;
  if (dir == "RIGHT") snakeX += snakeBox;
  if (dir == "DOWN") snakeY += snakeBox;
  if (dir == "UP") snakeY -= snakeBox;

// if snake eats apple
  if (snakeX === X && snakeY === Y) {
    score++;
    apple1();
  } else {
    snake.pop();
  }
  let newHead = {
    x: snakeX,
    y: snakeY,
  };

  if (
    snakeX < 0 ||
    snakeX >= cWidth ||
    snakeY < 0 ||
    snakeY >= cHeight ||
    collision(newHead, snake)
  ) {
    gameOver();
    return;
  }

  snake.unshift(newHead);
  ctx.fillStyle = "white";
  ctx.font = "40px tahoma";
  ctx.fillText(score, 10, 40);
}
var gm = setInterval(displaySnake, 200);
function gameOver() {
  clearInterval(gm);
  ctx.fillStyle = "white";
  ctx.font = "40 tahoma";
  ctx.fillText("Game Over", cWidth / 2 - 100, cHeight / 2);
}
// Display apple
function apple() {
  ctx.beginPath();
  ctx.fillStyle = "red";
  ctx.arc(X, Y, 10, 0, Math.PI * 2);
  ctx.fill();
}

function collision(head, ar) {
  for (i = 0; i < ar.length; i++) {
    if (ar[i].x == head.x && ar[i].y == head.y) {
      return true;
    }
  }
  return false;
}
function apple1() {
  X = Math.floor(Math.random() * (totalMoves - 2 - 3) + 3) * snakeBox;
  Y = Math.floor(Math.random() * (totalMoves - 2 - 3) + 3) * snakeBox;
}
