let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);

const graph = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));

for (let i = 2; i < M + 2; i++) {
  const [start, end, cost] = input[i].split(" ").map(Number);
  if (graph[start][end] === null || graph[start][end] > cost) {
    graph[start][end] = cost;
  }
}

const [start, end] = input[M + 2].split(" ").map(Number);

const distance = new Array(N + 1).fill(Infinity);
const visited = new Array(N + 1).fill(false);

const nextNode = () => {
  let min = Infinity;
  let minIdx = null;

  for (let i = 1; i <= N; i++) {
    if (!visited[i] && distance[i] < min) {
      min = distance[i];
      minIdx = i;
    }
  }
  return minIdx;
};

distance[start] = 0;

let cur = start;

for (let i = 0; i < N; i++) {
  visited[cur] = true;

  for (let j = 1; j <= N; j++) {
    if (graph[cur][j]!==Infinity && graph[cur][j] + distance[cur] < distance[j]) {
      distance[j] = graph[cur][j] + distance[cur];
    }
  }

  if (nextNode()) {
    cur = nextNode();
  } else {
    break;
  }
}

console.log(distance[end]);