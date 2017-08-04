var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
var blockSize = width / 30;
var widthInBlocks = width / blockSize;
var heightInBlocks = height / blockSize;
var backgroundColor = 'DimGray';
var score = 0;
var drawScore = function () {
  ctx.font = "20px sans-serif";
  ctx.fillStyle = "White";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("Счет: " + score, blockSize, blockSize);
};
var drawBackground = function () {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
};
var gameOver = function () {
  ctx.font = "44px serif";
  ctx.fillStyle = "White";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("Конец игры", width / 2, height / 2);
  drawScore();
  nextStep = false;
};
var circle = function (x, y, radius, fillCircle) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2, false);
  if (fillCircle) {
    ctx.fill();
  } else {
    ctx.stroke();
  }
};
var Block = function (col, row) {
  this.col = col;
  this.row = row;
};
Block.prototype.drawSquare = function (color) {
  var x = this.col * blockSize;
  var y = this.row * blockSize;
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(x, y, blockSize, blockSize);
  ctx.fillStyle = color;
  ctx.fillRect(x + 3, y + 3, blockSize - 6, blockSize - 6);
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(x + 4, y + 4, blockSize - 8, blockSize - 8);
  ctx.fillStyle = color;
  ctx.fillRect(x + 9, y + 9, blockSize - 18, blockSize - 18);
};
Block.prototype.drawCircle = function (color) {
  var centerX = this.col * blockSize + blockSize / 2;
  var centerY = this.row * blockSize + blockSize / 2;
  ctx.fillStyle = color;
  circle(centerX, centerY, blockSize / 2, true);
};
Block.prototype.equal = function (otherBlock) {
  return this.col === otherBlock.col && this.row === otherBlock.row;
};
var Snake = function () {
  this.segments = [
    new Block(7, 5),
    new Block(6, 5),
    new Block(5, 5)
  ];
  this.direction = "right";
  this.nextDirection = "right";
};
Snake.prototype.draw = function (color1, color2) {
  for (var i = 0; i < this.segments.length; i++) {
    this.segments[i].drawSquare((i % 2 === 0) ? color1 : color2);
  }
};
Snake.prototype.move = function () {
  var head = this.segments[0];
  var newHead;
  this.direction = this.nextDirection;
  if (this.direction === "right") {
    newHead = new Block(head.col + 1, head.row);
  } else if (this.direction === "down") {
    newHead = new Block(head.col, head.row + 1);
  } else if (this.direction === "left") {
    newHead = new Block(head.col - 1, head.row);
  } else if (this.direction === "up") {
    newHead = new Block(head.col, head.row - 1);
  }
  if (this.checkCollision(newHead)) {
    gameOver();
    return;
  }
  this.segments.unshift(newHead);
  if (newHead.equal(apple.position)) {
    score++;
    if (score % 10 === 0) animationTime -= 10;
    while (this.checkCollision(apple.position)) {
      apple.move();
    }
  } else {
    this.segments.pop();
  }
};
Snake.prototype.checkCollision = function (head) {
  var leftCollision = (head.col === -1);
  var topCollision = (head.row === -1);
  var rightCollision = (head.col === widthInBlocks);
  var bottomCollision = (head.row === heightInBlocks);
  var wallCollision = leftCollision || topCollision || rightCollision || bottomCollision;
  var selfCollision = false;
  for (var i = 0; i < this.segments.length; i++) {
    if (head.equal(this.segments[i])) {
      selfCollision = true;
    }
  }
  return wallCollision || selfCollision;
};
Snake.prototype.setDirection = function (newDirection) {
  if (this.direction === "up"    && newDirection === "down" ||
    this.direction === "right" && newDirection === "left" ||
    this.direction === "down"  && newDirection === "up"   ||
    this.direction === "left"  && newDirection === "right") {
    return;
  }
  this.nextDirection = newDirection;
};
var Apple = function () {
  this.position = new Block(10, 10);
};
Apple.prototype.draw = function () {
  this.position.drawSquare('Coral');
};
Apple.prototype.move = function () {
  var randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1;
  var randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1;
  this.position = new Block(randomCol, randomRow);
};
var snake = new Snake();
var apple = new Apple();
var nextStep = true;
var colors = ['LightBlue', 'Gold'];
var animationTime = 150;
var gameLoop = function () {
  snake.move();
  if (nextStep) {
    ctx.clearRect(0, 0, width, height);
    drawBackground();
    snake.draw(colors[0], colors[1]);
    apple.draw();
    colors.reverse();
    setTimeout(gameLoop, animationTime);
  }
};
gameLoop();
var directions = {
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
  65: 'left',
  87: 'up',
  68: 'right',
  83: 'down'
};
$("body").keydown(function (event) {
  var newDirection = directions[event.keyCode];
  if (newDirection) {
    snake.setDirection(newDirection);
  }
});
$('#button-left').click(function() {
  snake.setDirection('left');
});
$('#button-up').click(function() {
  snake.setDirection('up');
});
$('#button-right').click(function() {
  snake.setDirection('right');
});
$('#button-down').click(function() {
  snake.setDirection('down');
});