let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [V, E] = input[0].split(" ").map(Number);
const K = Number(input[1]);

const graph = Array.from({ length: V + 1 }, () => []);
for (let i = 2; i < E + 2; i++) {
  const [u, v, w] = input[i].split(" ").map(Number);
  graph[u].push([v, w]);
}

const dijkstra = (start) => {
  const distance = Array(V + 1).fill(Infinity);
  distance[start] = 0;

  const visited = Array(V + 1).fill(false);

  for (let i = 1; i <= V; i++) {
    let minDist = Infinity;
    let minNode = -1;

    for (let j = 1; j <= V; j++) {
      if (!visited[j] && distance[j] < minDist) {
        minDist = distance[j];
        minNode = j;
      }
    }

    if (minNode === -1) break;
    visited[minNode] = true;

    for (const [neighbor, weight] of graph[minNode]) {
      if (distance[minNode] + weight < distance[neighbor]) {
        distance[neighbor] = distance[minNode] + weight;
      }
    }
  }
  return distance;
};
const dist = dijkstra(K);

for (let i = 1; i <= V; i++) {
  if (dist[i] === Infinity) {
    console.log("INF");
  } else {
    console.log(dist[i]);
  }
}
