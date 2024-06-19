let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const arr = input.slice(2).map((v) => v.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);
const visited = Array.from({ length: N }).fill(false);
for (let i = 0; i < M; i++) {
  const [a, b] = arr[i];
  graph[a].push(b);
  graph[b].push(a);
}

let count = 0;
const dfs = () => {
  const stack = [1];
  visited[1] = true;

  while (stack.length) {
    const node = stack.pop();
    for (const neighbor of graph[node]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        stack.push(neighbor);
        count++;
      }
    }
  }
};

dfs();
console.log(count);
