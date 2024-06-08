let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const arr = input.map((v) => v.split("").map(Number));

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
let minCount = Infinity;

const bfs = (startY, startX) => {
  const queue = [[startY, startX]];
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  visited[startY][startX] = true;
  const distance = Array.from({ length: N }, () => Array(M).fill(0));
  distance[startY][startX] = 1;

  while (queue.length > 0) {
    const [y, x] = queue.shift();

    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;
      if (
        ny >= 0 &&
        ny < N &&
        nx >= 0 &&
        nx < M &&
        !visited[ny][nx] &&
        arr[ny][nx] === 1
      ) {
        queue.push([ny, nx]);
        visited[ny][nx] = true;
        distance[ny][nx] = distance[y][x] + 1;
      }
    }
  }
  return distance[N - 1][M - 1];
};
console.log(bfs(0, 0));
