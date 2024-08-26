let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array(N + 1).fill(0);

for (let i = 1; i <= M; i++) {
  const [A, B] = input[i].split(" ").map(Number);
  graph[A].push(B);
  visited[B]++;
}

const queue = [];

for (let i = 1; i <= N; i++) {
  if (visited[i] === 0) queue.push(i);
}

const answer = [];
while (queue.length) {
  const cur = queue.shift();
  answer.push(cur);

  for (const node of graph[cur]) {
    visited[node]--;
    if (visited[node] === 0) queue.push(node);
  }
}

console.log(answer.join(" "));
