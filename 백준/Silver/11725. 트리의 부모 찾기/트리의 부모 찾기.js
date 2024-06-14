let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const graph = Array.from({ length: N + 1 }, () => []);
const visited = new Array(N + 1).fill(false);
const parent = new Array(N + 1).fill(-1);

for (let i = 1; i < N; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}
const dfs = (start) => {
  if (visited[start]) return;
  visited[start] = true;
  for (const neighbor of graph[start]) {
    if (!visited[neighbor]) {
      parent[neighbor] = start;
    }
    dfs(neighbor);
  }
};

dfs(1);
let answer = "";
for (let i = 2; i <= N; i++) {
  answer += parent[i] + "\n";
}
console.log(answer);
