let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, V] = input.shift().split(" ").map(Number);

const graph = Array.from({ length: N + 1 }, () => Array(0));

for (let i = 0; i < M; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  graph[a].push(b);
  graph[b].push(a);
}

function dfs(start) {
  const stack = [start];
  const visited = new Array(N + 1).fill(false);
  const answer = [];

  while (stack.length) {
    const node = stack.pop();
    if (!visited[node]) {
      visited[node] = true;
      answer.push(node);
      stack.push(...graph[node]);
    }
  }
  return answer.join(" ");
}

function bfs(start) {
  const queue = [start];
  const visited = new Array(N + 1).fill(false);
  const answer = [];

  while (queue.length) {
    const node = queue.shift();
    if (!visited[node]) {
      visited[node] = true;
      answer.push(node);
      queue.push(...graph[node]);
    }
  }
  return answer.join(" ");
}
graph.map((el) => el.sort((a, b) => b - a));
console.log(dfs(V));
graph.map((el) => el.sort((a, b) => a - b));
console.log(bfs(V));