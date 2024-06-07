let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const K = input.shift().split(" ").map(Number);
let idx = 0;
const answer = [];
for (let i = 0; i < K; i++) {
  let result = true;
  const [V, E] = input[idx++].split(" ").map(Number);
  const graph = Array.from({ length: V + 1 }, () => []);
  for (let j = 0; j < E; j++) {
    const [u, v] = input[idx++].split(" ").map(Number);
    graph[u].push(v);
    graph[v].push(u);
  }

  const visited = Array(V + 1).fill(0);

  const bfs = (start) => {
    const queue = [start];
    visited[start] = 1;

    while (queue.length > 0) {
      const node = queue.shift();
      for (const nodes of graph[node]) {
        if (visited[nodes] === 0) {
          visited[nodes] = -visited[node];
          queue.push(nodes);
        } else if (visited[nodes] === visited[node]) {
          return false;
        }
      }
    }
    return true;
  };

  for (let i = 1; i <= V; i++) {
    if (visited[i] === 0 && !bfs(i)) {
      result = false;
      break;
    }
  }
  answer.push(result ? "YES" : "NO");
}
console.log(answer.join("\n"));