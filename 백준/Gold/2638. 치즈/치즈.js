let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const cheese = input.slice(1).map((v) => v.split(" ").map(Number));

const dir = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const bfs = () => {
  const queue = [[0, 0]];
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  visited[0][0] = true;

  while (queue.length) {
    const [y, x] = queue.shift();
    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < M &&
        ny < N &&
        !visited[ny][nx] &&
        cheese[ny][nx] === 0
      ) {
        visited[ny][nx] = true;
        queue.push([ny, nx]);
      }
    }
  }
  return visited;
};

const meltCheese = () => {
  let time = 0;
  while (true) {
    const air = bfs();
    let melted = false;

    const melting = [];

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (cheese[i][j] === 1) {
          let contact = 0;
          for (const [dy, dx] of dir) {
            const ny = i + dy;
            const nx = j + dx;
            if (nx >= 0 && ny >= 0 && nx < M && ny < N && air[ny][nx]) {
              contact++;
            }
          }
          if (contact >= 2) {
            melting.push([i, j]);
            melted = true;
          }
        }
      }
    }
    if (!melted) {
      break;
    }
    for (const [i, j] of melting) {
      cheese[i][j] = 0;
    }
    time++;
  }
  return time;
};

console.log(meltCheese());
