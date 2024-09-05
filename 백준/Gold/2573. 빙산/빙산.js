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

const melting = () => {
  const meltingCount = Array.from({ length: N }, () => Array(M).fill(0));

  for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < M - 1; j++) {
      if (arr[i][j] > 0) {
        let count = 0;
        for (const [dy, dx] of dir) {
          const ny = i + dy;
          const nx = j + dx;
          if (arr[ny][nx] === 0) count++;
        }
        meltingCount[i][j] = count;
      }
    }
  }

  for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < M - 1; j++) {
      arr[i][j] = Math.max(0, arr[i][j] - meltingCount[i][j]);
    }
  }
};

const solution = () => {
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  let count = 0;

  const bfs = (startY, startX) => {
    const queue = [[startY, startX]];
    visited[startY][startX] = true;

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
          arr[ny][nx] > 0
        ) {
          visited[ny][nx] = true;
          queue.push([ny, nx]);
        }
      }
    }
  };

  for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < M - 1; j++) {
      if (arr[i][j] > 0 && !visited[i][j]) {
        count++;
        bfs(i, j);
      }
    }
  }
  return count;
};

let year = 0;

while (true) {
  const count = solution();
  if (count >= 2) {
    console.log(year);
    break;
  }

  if (count === 0) {
    console.log(0);
    break;
  }

  melting();
  year++;
}
