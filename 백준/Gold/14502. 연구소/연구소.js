let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const dir = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

const spreadVirus = (matrix, N, M) => {
  const queue = [];
  const visited = Array.from({ length: N }, () => Array(M).fill(false));
  let safeZone = 0;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (matrix[i][j] === 2) {
        queue.push([i, j]);
        visited[i][j] = true;
      } else if (matrix[i][j] === 0) {
        safeZone++;
      }
    }
  }

  let front = 0;
  while (queue.length > front) {
    const [y, x] = queue[front++];

    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;

      if (
        ny >= 0 &&
        ny < N &&
        nx >= 0 &&
        nx < M &&
        !visited[ny][nx] &&
        matrix[ny][nx] === 0
      ) {
        visited[ny][nx] = true;
        matrix[ny][nx] = 2;
        queue.push([ny, nx]);
        safeZone--;
      }
    }
  }

  return safeZone;
};

const getSafeZone = (matrix, N, M) => {
  let maxSafeZone = 0;

  const setWalls = (count) => {
    if (count === 3) {
      const newMatrix = matrix.map((row) => row.slice());
      const safeZone = spreadVirus(newMatrix, N, M);
      maxSafeZone = Math.max(safeZone, maxSafeZone);
      return;
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (matrix[i][j] === 0) {
          matrix[i][j] = 1;
          setWalls(count + 1);
          matrix[i][j] = 0;
        }
      }
    }
  };
  setWalls(0);
  return maxSafeZone;
};

console.log(getSafeZone(arr, N, M));
