let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split("").map(Number));

const visited = Array.from({ length: M + 1 }, () => Array(N + 1).fill(false));
const distance = Array.from({ length: M + 1 }, () => Array(N + 1).fill(0));

const dir = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];
const bfs = () => {
  if (N === 1 && M === 1) {
    return 0;
  }
  const queue = [[1, 1]];
  visited[1][1] = true;

  while (queue.length) {
    const [y, x] = queue.shift();
    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;
      if (ny === M && nx === N) {
        return distance[y][x];
      }
      if (ny >= 1 && ny <= M && nx >= 1 && nx <= N && !visited[ny][nx]) {
        if (arr[ny - 1][nx - 1] === 0) {
          visited[ny][nx] = true;
          distance[ny][nx] = distance[y][x];
          queue.unshift([ny, nx]);
        }
        if (arr[ny - 1][nx - 1] === 1) {
          visited[ny][nx] = true;
          distance[ny][nx] = distance[y][x] + 1;
          queue.push([ny, nx]);
        }
      }
    }
  }
};

console.log(bfs());