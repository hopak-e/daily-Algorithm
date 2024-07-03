let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [R, C] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(""));
const visited = Array.from({ length: 26 }, () => false);

const dir = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const alphabetIdx = (char) => char.charCodeAt(0) - "A".charCodeAt(0);

let max = 0;
const dfs = (y, x, count) => {
  max = Math.max(max, count);

  for (const [dy, dx] of dir) {
    const ny = y + dy;
    const nx = x + dx;
    if (ny >= 0 && ny < R && nx >= 0 && nx < C) {
      const idx = alphabetIdx(arr[ny][nx]);
      if (!visited[idx]) {
        visited[idx] = true;
        dfs(ny, nx, count + 1);
        visited[idx] = false;
      }
    }
  }
};
visited[alphabetIdx(arr[0][0])] = true;
dfs(0, 0, 1);
console.log(max);
