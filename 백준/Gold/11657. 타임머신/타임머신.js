let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const edges = [];
for (let i = 1; i <= M; i++) {
  const [A, B, C] = input[i].split(" ").map(Number);
  edges.push([A, B, C]);
}

const INF = Infinity;
const distances = new Array(N + 1).fill(INF);
distances[1] = 0;

function bellmanFord() {
  for (let i = 1; i < N; i++) {
    for (const [start, end, cost] of edges) {
      if (
        distances[start] !== INF &&
        distances[start] + cost < distances[end]
      ) {
        distances[end] = distances[start] + cost;
      }
    }
  }

  for (const [start, end, cost] of edges) {
    if (distances[start] !== INF && distances[start] + cost < distances[end]) {
      return false; // 음수 사이클이 있음
    }
  }
  return true; // 음수 사이클이 없음
}

if (!bellmanFord()) {
  console.log(-1);
} else {
  const result = [];
  for (let i = 2; i <= N; i++) {
    result.push(distances[i] === INF ? -1 : distances[i]);
  }
  console.log(result.join("\n"));
}
