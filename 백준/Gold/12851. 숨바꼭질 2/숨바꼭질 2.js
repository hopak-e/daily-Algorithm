let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

const visited = Array.from({ length: 100001 }).fill(false);
const time = Array.from({ length: 100001 }).fill(0);
const path = Array.from({ length: 100001 }).fill(0);

const bfs = (start) => {
  const queue = [start];
  visited[start] = true;
  path[start] = 1;
  while (queue.length) {
    const cur = queue.shift();
    for (let next of [cur - 1, cur + 1, cur * 2]) {
      if (cur < 0 || cur > 100001) continue;

      if (!visited[next]) {
        queue.push(next);
        visited[next] = true;
        time[next] = time[cur] + 1;
        path[next] = path[cur];
      } else if (time[next] === time[cur] + 1) {
        path[next] += path[cur];
      }
    }
  }
};
bfs(N);
console.log(time[K]);
console.log(path[K]);
