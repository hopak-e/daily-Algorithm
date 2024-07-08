let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m, r] = input[0].split(" ").map(Number);
const arrT = input[1].split(" ").map(Number);
const arr = input.slice(2).map((v) => v.split(" ").map(Number));

const graph = Array.from({ length: n + 1 }, () => []);

for (let i = 0; i < r; i++) {
  const [a, b, l] = arr[i];
  graph[a].push([b, l]);
  graph[b].push([a, l]);
}

const dijkstra = (start) => {
  const distance = Array(n + 1).fill(Infinity);
  distance[start] = 0;
  const pq = [[0, start]];

  while (pq.length) {
    const [curDist, curNode] = pq.pop();

    if (curDist > distance[curNode]) continue;

    for (const [next, weight] of graph[curNode]) {
      const dist = curDist + weight;
      if (dist < distance[next]) {
        distance[next] = dist;
        pq.push([dist, next]);
      }
    }
  }
  return distance;
};

let max = 0;

for (let i = 1; i <= n; i++) {
  const distance = dijkstra(i);
  let sum = 0;

  for (let j = 1; j <= n; j++) {
    if (distance[j] <= m) {
      sum += arrT[j - 1];
    }
  }
  max = Math.max(max, sum);
}
console.log(max);