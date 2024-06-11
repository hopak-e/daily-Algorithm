let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const visited = Array.from({ length: N }, () => Array(N).fill(false));
let islandId = 2;
const dir = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const dfs = (startY, startX, id) => {
  const stack = [[startY, startX]];
  arr[startY][startX] = id;
  visited[startY][startX] = true;

  while (stack.length) {
    const [y, x] = stack.pop();
    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;

      if (
        ny >= 0 &&
        ny < N &&
        nx >= 0 &&
        nx < N &&
        arr[ny][nx] === 1 &&
        !visited[ny][nx]
      ) {
        visited[ny][nx] = true;
        arr[ny][nx] = id;
        stack.push([ny, nx]);
      }
    }
  }
};

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 1 && !visited[i][j]) {
      dfs(i, j, islandId);
      islandId++;
    }
  }
}

const bfs = (id) => {
  const queue = [];
  const distance = Array.from({ length: N }, () => Array(N).fill(-1));

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (arr[i][j] === id) {
        queue.push([i, j]);
        distance[i][j] = 0;
      }
    }
  }

  let minDistance = Infinity;
  while (queue.length) {
    const [y, x] = queue.shift();

    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny >= 0 && ny < N && nx >= 0 && nx < N) {
        if (arr[ny][nx] > 0 && arr[ny][nx] !== id) {
          minDistance = Math.min(minDistance, distance[y][x]);
        }
        if (arr[ny][nx] === 0 && distance[ny][nx] === -1) {
          distance[ny][nx] = distance[y][x] + 1;
          queue.push([ny, nx]);
        }
      }
    }
  }
  return minDistance;
};

let minBridge = Infinity;
for (let i = 2; i < islandId; i++) {
  minBridge = Math.min(minBridge, bfs(i));
}

console.log(minBridge);