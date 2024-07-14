let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split("").map(Number));

const dir = [
  [0, 1],
  [1, 0],
  [-1, 0],
  [0, -1],
];

const bfs = () => {
  const queue = [[0, 0, 1, 0]];
  const visited = Array.from({ length: N }, () =>
    Array.from({ length: M }, () => [false, false])
  );

  visited[0][0][0] = true;
  let front = 0;
  while (queue.length > front) {
    const [y, x, dist, broken] = queue[front++];

    if (y === N - 1 && x === M - 1) {
      return dist;
    }

    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny >= 0 && nx >= 0 && ny < N && nx < M) {
        if (arr[ny][nx] === 0 && !visited[ny][nx][broken]) {
          visited[ny][nx][broken] = true;
          queue.push([ny, nx, dist + 1, broken]);
        }

        if (arr[ny][nx] === 1 && broken === 0 && !visited[ny][nx][1]) {
          visited[ny][nx][1] = true;
          queue.push([ny, nx, dist + 1, 1]);
        }
      }
    }
  }
  return -1;
};

console.log(bfs());
