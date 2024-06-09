let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [M, N] = input.shift().split(" ").map(Number);
const arr = input.map((v) => v.split(" ").map(Number));

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const queue = [];
const days = Array.from({ length: N }, () => Array(M).fill(0));

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === 1) {
      queue.push([i, j]);
    }
  }
}

let front = 0;
while (front < queue.length) {
  const [y, x] = queue[front++];

  for (const [dy, dx] of dir) {
    const ny = y + dy;
    const nx = x + dx;

    if (ny >= 0 && ny < N && nx >= 0 && nx < M && arr[ny][nx] === 0) {
      arr[ny][nx] = 1;
      days[ny][nx] = days[y][x] + 1;
      queue.push([ny, nx]);
    }
  }
}

let maxDays = 0;
let allVisited = true;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === 0) {
      allVisited = false;
    }
    maxDays = Math.max(maxDays, days[i][j]);
  }
}

if (allVisited) {
  console.log(maxDays);
} else {
  console.log(-1);
}