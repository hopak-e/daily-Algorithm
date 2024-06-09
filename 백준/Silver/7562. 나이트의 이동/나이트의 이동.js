let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = input.shift().split(" ").map(Number);

const dir = [
  [2, 1],
  [1, 2],
  [-1, 2],
  [-2, 1],
  [2, -1],
  [1, -2],
  [-1, -2],
  [-2, -1],
];

const bfs = (l, start, end) => {
  const queue = [];
  const visited = Array.from({ length: l }, () => Array(l).fill(false));

  queue.push([...start, 0]);
  visited[start[0]][start[1]] = true;

  while (queue.length) {
    const [y, x, moves] = queue.shift();

    if (y === end[0] && x === end[1]) {
      return moves;
    }

    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;

      if (ny >= 0 && ny < l && nx >= 0 && nx < l && !visited[ny][nx]) {
        visited[ny][nx] = true;
        queue.push([ny, nx, moves + 1]);
      }
    }
  }
};

let idx = 0;
for (let i = 0; i < N; i++) {
  const l = Number(input[idx]);
  const start = input[idx + 1].split(" ").map(Number);
  const end = input[idx + 2].split(" ").map(Number);
  idx += 3;
  console.log(bfs(l, start, end));
}
