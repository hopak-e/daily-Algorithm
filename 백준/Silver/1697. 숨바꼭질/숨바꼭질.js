let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const [N, K] = input.split(" ").map(Number);
const MAX = 100000;
const visited = Array(MAX + 1).fill(false);

const bfs = (start) => {
  const queue = [[start, 0]];
  visited[start] = true;

  while (queue.length) {
    const [current, time] = queue.shift();
    if (current === K) {
      return time;
    }

    const nextPosition = [current - 1, current + 1, current * 2];

    for (const next of nextPosition) {
      if (next >= 0 && next <= MAX && !visited[next]) {
        visited[next] = true;
        queue.push([next, time + 1]);
      }
    }
  }
};
console.log(bfs(N));
