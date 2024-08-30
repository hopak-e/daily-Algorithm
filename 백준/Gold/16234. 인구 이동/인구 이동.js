let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, L, R] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const bfs = (startY, startX, visited) => {
  const queue = [[startY, startX]];
  const unit = [[startY, startX]];
  visited[startY][startX] = true;

  let sum = arr[startY][startX];
  let count = 1;

  while (queue.length) {
    const [y, x] = queue.shift();

    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny >= 0 && ny < N && nx >= 0 && nx < N && !visited[ny][nx]) {
        const diff = Math.abs(arr[y][x] - arr[ny][nx]);
        if ((L <= diff) & (R >= diff)) {
          visited[ny][nx] = true;
          queue.push([ny, nx]);
          unit.push([ny, nx]);
          sum += arr[ny][nx];
          count++;
        }
      }
    }
  }

  const newPopulation = Math.floor(sum / count);
  for (const [uy, ux] of unit) {
    arr[uy][ux] = newPopulation;
  }
  return count > 1;
};

let days = 0;

while (true) {
  let visited = Array.from({ length: N }, () => Array(N).fill(false));
  let isMoved = false;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (!visited[i][j]) {
        if (bfs(i, j, visited)) {
          isMoved = true;
        }
      }
    }
  }
  if (!isMoved) break;
  days++;
}

console.log(days);
