const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const backgroundColor = '#333';
const cellColor = '#fffb00';
const stepsPerSecond = 100;
const existenceCoefficient = 0.12;
const cellSize = 3;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 4;
const { width, height } = canvas.getBoundingClientRect();
const widthInCells = Math.floor(width / cellSize);
const heightInCells = Math.floor(height / cellSize);

function countNeighbors(state, row, col) {
  let neighbors = -state[row][col];

  for (let i = -1; i < 2; i += 1) {
    for (let j = -1; j < 2; j += 1) {
      const x = (row + heightInCells + i) % heightInCells;
      const y = (col + widthInCells + j) % widthInCells;
      neighbors += state[x][y];
    }
  }

  return neighbors;
}

function isAlive(state, row, col) {
  const neighbors = countNeighbors(state, row, col);

  return neighbors === 2 ? state[row][col] : Number(neighbors === 3);
}

function getNewState(state) {
  const newState = [];

  for (let row = 0; row < heightInCells; row += 1) {
    const newRow = [];
    for (let col = 0; col < widthInCells; col += 1) {
      newRow[col] = state
        ? isAlive(state, row, col)
        : Number(Math.random() < existenceCoefficient);
    }
    newState[row] = newRow;
  }

  return newState;
}

function drawBackground() {
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, width, height);
}

function drawState(state) {
  ctx.fillStyle = cellColor;
  for (let row = 0; row < heightInCells; row += 1) {
    const y = row * cellSize;
    for (let col = 0; col < widthInCells; col += 1) {
      if (state[row][col]) {
        const x = col * cellSize;
        ctx.fillRect(x, y, cellSize - 1, cellSize - 1);
      }
    }
  }
}

function redraw(state) {
  ctx.clearRect(0, 0, width, height);
  drawBackground();
  drawState(state);
}

let timestamp = Date.now();
let state = getNewState();

const step = () => {
  const now = Date.now();
  if (now - timestamp > 1000 / stepsPerSecond) {
    state = getNewState(state);
    redraw(state);
    timestamp = now;
  }
  window.requestAnimationFrame(step);
};

window.requestAnimationFrame(step);
