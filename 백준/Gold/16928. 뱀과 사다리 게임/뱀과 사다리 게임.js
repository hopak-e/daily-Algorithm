let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const board = Array.from({ length: 101 }, (_, i) => i);
let idx = 0;
for (let i = 0; i < N; i++) {
  const [start, end] = arr[idx++];
  board[start] = end;
}
for (let i = 0; i < M; i++) {
  const [start, end] = arr[idx++];
  board[start] = end;
}

const bfs = () => {
  const queue = [[1, 0]];
  const visited = Array.from({ length: 101 }).fill(false);
  visited[1] = true;

  while (queue.length) {
    const [cur, count] = queue.shift();

    for (let i = 1; i <= 6; i++) {
      let next = cur + i;
      if (next > 100) continue;
      next = board[next];

      if (next === 100) return count + 1;

      if (!visited[next]) {
        visited[next] = true;
        queue.push([next, count + 1]);
      }
    }
  }
};
console.log(bfs());