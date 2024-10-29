let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const K = +input[0];
const [W, H] = input[1].split(" ").map(Number);
const grid = input.slice(2).map((line) => line.split(" ").map(Number));

const monkeyMoves = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
const horseMoves = [
  [2, 1],
  [2, -1],
  [-2, 1],
  [-2, -1],
  [1, 2],
  [1, -2],
  [-1, 2],
  [-1, -2],
];

const visited = Array.from({ length: H }, () =>
  Array.from({ length: W }, () => Array(K + 1).fill(false))
);

const queue = [[0, 0, 0, 0]];
visited[0][0][0] = true;

let result = -1;

while (queue.length) {
  const [x, y, horseCount, steps] = queue.shift();

  if (x === H - 1 && y === W - 1) {
    result = steps;
    break;
  }

  for (const [dx, dy] of monkeyMoves) {
    const nx = x + dx;
    const ny = y + dy;
    if (
      nx >= 0 &&
      nx < H &&
      ny >= 0 &&
      ny < W &&
      grid[nx][ny] === 0 &&
      !visited[nx][ny][horseCount]
    ) {
      visited[nx][ny][horseCount] = true;
      queue.push([nx, ny, horseCount, steps + 1]);
    }
  }

  if (horseCount < K) {
    for (const [dx, dy] of horseMoves) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        nx < H &&
        ny >= 0 &&
        ny < W &&
        grid[nx][ny] === 0 &&
        !visited[nx][ny][horseCount + 1]
      ) {
        visited[nx][ny][horseCount + 1] = true;
        queue.push([nx, ny, horseCount + 1, steps + 1]);
      }
    }
  }
}

console.log(result);
