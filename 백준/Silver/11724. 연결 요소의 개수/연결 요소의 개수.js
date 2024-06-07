let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => Array(0));
const visited = new Array(N + 1).fill(false);
for (let i = 0; i < M; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

const dfs = (start) => {
  for (let i = 0; i < graph[start].length; i++) {
    visited[start] = true;
    if (!visited[graph[start][i]]) {
      dfs(graph[start][i]);
    }
  }
};

let answer = 0;
for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    dfs(i);
    answer++;
  }
}

console.log(answer);
