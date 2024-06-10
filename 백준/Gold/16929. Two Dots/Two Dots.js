let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((v) => v.split(""));

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

const dfs = (y, x, startY, startX, color, count, visited) => {
  if (visited[y][x]) {
    if (count >= 4 && x === startX && y === startY) return true;
    return false;
  }

  visited[y][x] = true;

  for (const [dy, dx] of dir) {
    const ny = y + dy;
    const nx = x + dx;

    if (ny >= 0 && ny < N && nx >= 0 && nx < M && arr[ny][nx] === color) {
      if (dfs(ny, nx, startY, startX, color, count + 1, visited)) return true;
    }
  }

  return false;
};

let result = false;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    const visited = Array.from({ length: N }, () => Array(M).fill(false));
    if (dfs(i, j, i, j, arr[i][j], 1, visited)) {
      result = true;
      break;
    }
  }
  if (result) break;
}

console.log(result ? "Yes" : "No");
