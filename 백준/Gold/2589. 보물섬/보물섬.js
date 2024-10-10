let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [R, C] = input[0].split(" ").map(Number);
const map = input.slice(1).map((line) => line.split(""));

const directions = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

// BFS 함수 정의
function bfs(startX, startY) {
  const visited = Array.from(Array(R), () => Array(C).fill(false));
  const queue = [[startX, startY, 0]];
  visited[startX][startY] = true;
  let maxDistance = 0;

  while (queue.length > 0) {
    const [x, y, dist] = queue.shift();
    maxDistance = Math.max(maxDistance, dist);

    for (const [dx, dy] of directions) {
      const nx = x + dx;
      const ny = y + dy;
      if (
        nx >= 0 &&
        nx < R &&
        ny >= 0 &&
        ny < C &&
        map[nx][ny] === "L" &&
        !visited[nx][ny]
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny, dist + 1]);
      }
    }
  }

  return maxDistance;
}

let maxDistance = 0;

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (map[i][j] === "L") {
      maxDistance = Math.max(maxDistance, bfs(i, j));
    }
  }
}

console.log(maxDistance);
