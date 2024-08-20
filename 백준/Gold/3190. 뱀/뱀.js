let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const K = Number(input[1]);
const apples = input.slice(2, 2 + K).map((v) => v.split(" ").map(Number));
const L = Number(input[2 + K]);
const dir = input.slice(3 + K).map((v) => {
  const [X, C] = v.split(" ");
  return [Number(X), C];
});

const dx = [0, 1, 0, -1];
const dy = [1, 0, -1, 0];

let board = Array.from({ length: N }, () => Array(N).fill(0));

apples.forEach(([r, c]) => {
  board[r - 1][c - 1] = 1;
});

let time = 0;
let direction = 0;
let snake = [[0, 0]];
board[0][0] = 2;

let idx = 0;

while (true) {
  time++;

  let [headX, headY] = snake[snake.length - 1];
  let newX = headX + dx[direction];
  let newY = headY + dy[direction];

  if (
    newX < 0 ||
    newX >= N ||
    newY < 0 ||
    newY >= N ||
    board[newX][newY] === 2
  ) {
    console.log(time);
    break;
  }

  if (board[newX][newY] === 1) {
    board[newX][newY] = 2;
    snake.push([newX, newY]);
  } else {
    board[newX][newY] = 2;
    snake.push([newX, newY]);
    let [tailX, tailY] = snake.shift();
    board[tailX][tailY] = 0;
  }

  if (idx < L && time === dir[idx][0]) {
    let turn = dir[idx][1];
    if (turn === "L") {
      direction = (direction + 3) % 4;
    } else {
      direction = (direction + 1) % 4;
    }
    idx++;
  }
}
