let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [M, N, K] = input[0].split(" ").map(Number);

const grid = Array.from({ length: M }, () => Array(N).fill(0));

for (let i = 1; i <= K; i++) {
  const [x1, y1, x2, y2] = input[i].split(" ").map(Number);
  for (let y = y1; y < y2; y++) {
    for (let x = x1; x < x2; x++) {
      grid[y][x] = 1;
    }
  }
}

const dir = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const dfs = (startY, startX) => {
  let area = 0;
  const stack = [[startY, startX]];
  grid[startY][startX] = 1;

  while (stack.length) {
    const [y, x] = stack.pop();
    area++;
    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny >= 0 && ny < M && nx >= 0 && nx < N && grid[ny][nx] === 0) {
        grid[ny][nx] = 1;
        stack.push([ny, nx]);
      }
    }
  }
  return area;
};

let areas = [];

for (let y = 0; y < M; y++) {
  for (let x = 0; x < N; x++) {
    if (grid[y][x] === 0) {
      const area = dfs(y, x);
      areas.push(area);
    }
  }
}

areas.sort((a, b) => a - b);
console.log(areas.length);
console.log(areas.join(" "));
