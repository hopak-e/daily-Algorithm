let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [M, N] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const dir = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

let dp = Array.from({ length: M }, () => Array(N).fill(-1));

const dfs = (y, x) => {
  if (y === M - 1 && x === N - 1) {
    return 1;
  }

  if (dp[y][x] !== -1) {
    return dp[y][x];
  }

  dp[y][x] = 0;

  for (const [dy, dx] of dir) {
    const ny = y + dy;
    const nx = x + dx;

    if (ny >= 0 && ny < M && nx >= 0 && nx < N && arr[ny][nx] < arr[y][x]) {
      dp[y][x] += dfs(ny, nx);
    }
  }
  return dp[y][x];
};

console.log(dfs(0, 0));
