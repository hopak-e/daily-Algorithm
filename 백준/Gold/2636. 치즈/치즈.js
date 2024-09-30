let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

const bfs = () => {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  const queue = [[0, 0]];
  visited[0][0] = true;

  while (queue.length > 0) {
    const [y, x] = queue.shift();
    for (const [dy, dx] of dir) {
      const nx = x + dx;
      const ny = y + dy;

      if (ny >= 0 && nx >= 0 && ny < N && nx < M && !visited[ny][nx]) {
        visited[ny][nx] = true;

        if (arr[ny][nx] === 0) {
          queue.push([ny, nx]);
        } else if (arr[ny][nx] === 1) {
          arr[ny][nx] = 2;
        }
      }
    }
  }
};

const melt = () => {
  let count = 0;
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (arr[i][j] === 2) {
        arr[i][j] = 0;
        count++;
      }
    }
  }
  return count;
};

let time = 0;
let last = 0;

while (true) {
  bfs();
  const melted = melt();

  if (melted === 0) {
    break;
  }

  last = melted;
  time++;
}

console.log(time);
console.log(last);
