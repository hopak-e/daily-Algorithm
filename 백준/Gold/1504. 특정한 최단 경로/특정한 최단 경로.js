let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, E] = input[0].split(" ").map(Number);
const arr = input.slice(1, E + 1).map((v) => v.split(" ").map(Number));
const [v1, v2] = input[E + 1].split(" ").map(Number);

const INF = 1e9;
const graph = Array.from({ length: N + 1 }, () => []);

arr.forEach(([a, b, c]) => {
  graph[a].push([b, c]);
  graph[b].push([a, c]);
});

const dijkstra = (start) => {
  const dist = Array(N + 1).fill(INF);
  const pq = [[0, start]];
  dist[start] = 0;

  while (pq.length) {
    const [curDist, curNode] = pq.pop();
    if (dist[curNode] < curDist) continue;

    for (const [nextNode, weight] of graph[curNode]) {
      const distance = curDist + weight;
      if (distance < dist[nextNode]) {
        dist[nextNode] = distance;
        pq.push([distance, nextNode]);
      }
    }
    pq.sort((a, b) => b[0] - a[0]);
  }
  return dist;
};

const From1 = dijkstra(1);
const FromV1 = dijkstra(v1);
const FromV2 = dijkstra(v2);

const route1 = From1[v1] + FromV1[v2] + FromV2[N];
const route2 = From1[v2] + FromV2[v1] + FromV1[N];

const result = Math.min(route1, route2);

console.log(result >= INF ? -1 : result);
