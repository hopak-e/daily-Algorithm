let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(""));
const visited = Array.from({ length: N }, () => Array(M).fill(false));

let peopleCount = 0;

const dir = [
  [1, 0],
  [0, 1],
  [-1, 0],
  [0, -1],
];

const bfs = (startY, startX) => {
  const queue = [[startY, startX]];
  visited[startY][startX] = true;

  while (queue.length) {
    const [y, x] = queue.shift();

    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;

      if (
        ny >= 0 &&
        ny < N &&
        nx >= 0 &&
        nx < M &&
        arr[ny][nx] !== "X" &&
        !visited[ny][nx]
      ) {
        if (arr[ny][nx] === "P") {
          peopleCount++;
        }
        visited[ny][nx] = true;
        queue.push([ny, nx]);
      }
    }
  }
};
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (arr[i][j] === "I") {
      bfs(i, j);
    }
  }
}

console.log(peopleCount === 0 ? "TT" : peopleCount);