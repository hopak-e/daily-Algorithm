let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const space = input.slice(1).map((line) => line.split(" ").map(Number));

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let sharkSize = 2;
let eatenFish = 0;
let time = 0;

const findShark = () => {
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (space[i][j] === 9) {
        space[i][j] = 0;
        return [i, j];
      }
    }
  }
  return null;
};

let [sharkY, sharkX] = findShark();

const bfs = (startY, startX) => {
  const visited = Array.from({ length: N }, () => Array(N).fill(false));
  const queue = [[startY, startX, 0]];
  visited[startY][startX] = true;
  const fishes = [];

  while (queue.length > 0) {
    const [y, x, dist] = queue.shift();

    for (const [dy, dx] of directions) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny >= 0 && ny < N && nx >= 0 && nx < N && !visited[ny][nx]) {
        visited[ny][nx] = true;

        if (space[ny][nx] > 0 && space[ny][nx] < sharkSize) {
          fishes.push([ny, nx, dist + 1]);
        }

        if (space[ny][nx] === 0 || space[ny][nx] === sharkSize) {
          queue.push([ny, nx, dist + 1]);
        }
      }
    }
  }

  if (fishes.length === 0) return null;

  fishes.sort((a, b) => {
    if (a[2] === b[2]) {
      if (a[0] === b[0]) return a[1] - b[1];
      return a[0] - b[0];
    }
    return a[2] - b[2];
  });

  return fishes[0];
};

while (true) {
  const fish = bfs(sharkY, sharkX);
  if (!fish) break;

  const [y, x, dist] = fish;
  space[y][x] = 0;
  sharkY = y;
  sharkX = x;
  time += dist;
  eatenFish += 1;

  if (eatenFish === sharkSize) {
    sharkSize += 1;
    eatenFish = 0;
  }
}

console.log(time);
