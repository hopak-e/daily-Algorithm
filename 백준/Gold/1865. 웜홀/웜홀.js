let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const TC = Number(input[0]);
let idx = 1;

for (let tc = 0; tc < TC; tc++) {
  const [N, M, W] = input[idx++].split(" ").map(Number);

  const graph = [];
  for (let i = 0; i < M; i++) {
    const [S, E, T] = input[idx++].split(" ").map(Number);
    graph.push([S, E, T]);
    graph.push([E, S, T]);
  }

  for (let i = 0; i < W; i++) {
    const [S, E, T] = input[idx++].split(" ").map(Number);
    graph.push([S, E, -T]);
  }

  const distance = new Array(N + 1).fill(0);
  for (let i = 1; i <= N; i++) {
    for (const [u, v, w] of graph) {
      if (distance[u] + w < distance[v]) {
        distance[v] = distance[u] + w;
      }
    }
  }

  let isSuccess = false;
  for (let i = 1; i <= N; i++) {
    for (const [u, v, w] of graph) {
      if (distance[u] + w < distance[v]) {
        isSuccess = true;
        break;
      }
    }
  }

  console.log(isSuccess ? "YES" : "NO");
}
