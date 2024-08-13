let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const dir = [
  [-1, 0],
  [1, 0],
  [0, 1],
  [0, -1],
];

const dfs = (y, x, visited, limit) => {
  visited[y][x] = true;

  for (const [dy, dx] of dir) {
    const ny = y + dy;
    const nx = x + dx;
    if (nx >= 0 && ny >= 0 && nx < N && ny < N) {
      if (!visited[ny][nx] && arr[ny][nx] > limit) {
        dfs(ny, nx, visited, limit);
      }
    }
  }
};

let safe = 0;

for (let h = 0; h <= 100; h++) {
  let visited = Array.from({ length: N }, () => Array(N).fill(false));
  let zone = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j] && arr[i][j] > h) {
        dfs(i, j, visited, h);
        zone++;
      }
    }
  }
  safe = Math.max(zone, safe);
}

console.log(safe);
