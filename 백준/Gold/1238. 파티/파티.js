let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, X] = input[0].split(" ").map(Number);
const path = input.slice(1).map((v) => v.split(" ").map(Number));
const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 0; i < M; i++) {
  const [start, end, t] = path[i];
  graph[start].push([end, t]);
}

const dijkstra = (start) => {
  const distance = Array.from({ length: N + 1 }).fill(Infinity);
  distance[start] = 0;
  const pq = [[0, start]];
  let front = 0;
  while (pq.length > front) {
    const [curDist, curNode] = pq[front++];

    if (curDist > distance[curNode]) continue;

    for (const [neighbor, weight] of graph[curNode]) {
      const dist = curDist + weight;
      if (dist < distance[neighbor]) {
        distance[neighbor] = dist;
        pq.push([dist, neighbor]);
      }
    }
  }
  return distance;
};

const fromX = dijkstra(X);
const toX = Array(N + 1);

for (let i = 1; i <= N; i++) {
  toX[i] = dijkstra(i)[X];
}

let max = 0;
for (let i = 1; i <= N; i++) {
  max = Math.max(max, toX[i] + fromX[i]);
}
console.log(max);
