const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
const width = canvas.width
const height = canvas.height
const blockSize = width / 30
const widthInBlocks = width / blockSize
const heightInBlocks = height / blockSize
const backgroundColor = 'DimGray'
let score = 0

function drawScore() {
	ctx.font = '20px sans-serif'
	ctx.fillStyle = 'White'
	ctx.textAlign = 'left'
	ctx.textBaseline = 'top'
	ctx.fillText('Score: ' + score, blockSize, blockSize)
}

function drawBackground() {
	ctx.fillStyle = backgroundColor
	ctx.fillRect(0, 0, width, height)
}

function Block(col, row) {
	this.col = col
	this.row = row
}

Block.prototype.drawSquare = function (color) {
	const x = this.col * blockSize
	const y = this.row * blockSize
	ctx.fillStyle = backgroundColor
	ctx.fillRect(x, y, blockSize, blockSize)
	ctx.fillStyle = color
	ctx.fillRect(x + 3, y + 3, blockSize - 6, blockSize - 6)
	ctx.fillStyle = backgroundColor
	ctx.fillRect(x + 4, y + 4, blockSize - 8, blockSize - 8)
	ctx.fillStyle = color
	ctx.fillRect(x + 9, y + 9, blockSize - 18, blockSize - 18)
}

Block.prototype.drawCircle = function (color) {
	const centerX = this.col * blockSize + blockSize / 2
	const centerY = this.row * blockSize + blockSize / 2
	ctx.fillStyle = color
	circle(centerX, centerY, blockSize / 2, true)
}

Block.prototype.equal = function (otherBlock) {
	return this.col === otherBlock.col && this.row === otherBlock.row
}

function Snake() {
	this.segments = [new Block(7, 5), new Block(6, 5), new Block(5, 5)]
	this.direction = 'right'
	this.nextDirection = 'right'
}

Snake.prototype.draw = function (color1, color2) {
	for (let i = 0; i < this.segments.length; i++) {
		this.segments[i].drawSquare(i % 2 === 0 ? color1 : color2)
	}
}

Snake.prototype.move = function () {
	const head = this.segments[0]
	let newHead
	this.direction = this.nextDirection
	if (this.direction === 'right') {
		newHead = new Block(head.col + 1, head.row)
	} else if (this.direction === 'down') {
		newHead = new Block(head.col, head.row + 1)
	} else if (this.direction === 'left') {
		newHead = new Block(head.col - 1, head.row)
	} else if (this.direction === 'up') {
		newHead = new Block(head.col, head.row - 1)
	}
	if (this.checkCollision(newHead)) {
		gameOver()
		return
	}
	this.segments.unshift(newHead)
	if (newHead.equal(apple.position)) {
		score++
		if (score % 10 === 0) animationTime -= 10
		while (this.checkCollision(apple.position)) {
			apple.move()
		}
	} else {
		this.segments.pop()
	}
}

Snake.prototype.checkCollision = function (head) {
	const leftCollision = head.col === -1
	const topCollision = head.row === -1
	const rightCollision = head.col === widthInBlocks
	const bottomCollision = head.row === heightInBlocks
	const wallCollision =
		leftCollision || topCollision || rightCollision || bottomCollision
	let selfCollision = false
	for (let i = 0; i < this.segments.length; i++) {
		if (head.equal(this.segments[i])) {
			selfCollision = true
		}
	}
	return wallCollision || selfCollision
}

Snake.prototype.setDirection = function (newDirection) {
	if (
		(this.direction === 'up' && newDirection === 'down') ||
		(this.direction === 'right' && newDirection === 'left') ||
		(this.direction === 'down' && newDirection === 'up') ||
		(this.direction === 'left' && newDirection === 'right')
	) {
		return
	}
	this.nextDirection = newDirection
}

function Apple() {
	this.position = new Block(10, 10)
}

Apple.prototype.draw = function () {
	this.position.drawSquare('Coral')
}

Apple.prototype.move = function () {
	const randomCol = Math.floor(Math.random() * (widthInBlocks - 2)) + 1
	const randomRow = Math.floor(Math.random() * (heightInBlocks - 2)) + 1
	this.position = new Block(randomCol, randomRow)
}

const snake = new Snake()
const apple = new Apple()
let nextStep = true
const colors = ['LightBlue', 'Gold']
const animationTime = 150

function gameLoop() {
	snake.move()
	if (nextStep) {
		ctx.clearRect(0, 0, width, height)
		drawBackground()
		snake.draw(colors[0], colors[1])
		apple.draw()
		colors.reverse()
		setTimeout(gameLoop, animationTime)
	}
}

function gameOver() {
	ctx.font = '44px sans-serif'
	ctx.fillStyle = 'White'
	ctx.textAlign = 'center'
	ctx.textBaseline = 'middle'
	ctx.fillText('Game Over', width / 2, height / 2)
	drawScore()
	nextStep = false
}

gameLoop()

const directions = {
	37: 'left',
	38: 'up',
	39: 'right',
	40: 'down',
	65: 'left',
	87: 'up',
	68: 'right',
	83: 'down',
}

document.body.addEventListener('keydown', (e) => {
	const newDirection = directions[e.keyCode]
	newDirection && snake.setDirection(newDirection)
})
