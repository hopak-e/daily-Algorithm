let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const directions = [
  [1, 0],
  [0, -1],
  [-1, 0],
  [0, 1],
];

const grid = Array.from({ length: 101 }, () => Array(101).fill(false));

for (let i = 1; i <= N; i++) {
  let [x, y, d, g] = input[i].split(" ").map(Number);

  const curve = [d];
  grid[y][x] = true;

  x += directions[d][0];
  y += directions[d][1];
  grid[y][x] = true;

  for (let gen = 0; gen < g; gen++) {
    const len = curve.length;
    for (let j = len - 1; j >= 0; j--) {
      const newDir = (curve[j] + 1) % 4;
      x += directions[newDir][0];
      y += directions[newDir][1];
      grid[y][x] = true;
      curve.push(newDir);
    }
  }
}

let squareCount = 0;
for (let i = 0; i < 100; i++) {
  for (let j = 0; j < 100; j++) {
    if (grid[i][j] && grid[i + 1][j] && grid[i][j + 1] && grid[i + 1][j + 1]) {
      squareCount++;
    }
  }
}

console.log(squareCount);