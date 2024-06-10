let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const arr = Array.from({ length: N + 1 }, () => []);
for (let i = 1; i <= N; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  arr[a].push(b);
  arr[b].push(a);
}

let cycle = [];
let visited = Array(N + 1).fill(false);
let parent = Array(N + 1).fill(-1);

const findCycle = (node, par) => {
  visited[node] = true;
  for (const neighbor of arr[node]) {
    if (!visited[neighbor]) {
      parent[neighbor] = node;
      if (findCycle(neighbor, node)) {
        return true;
      }
    } else if (neighbor !== par) {
      let cur = node;
      while (cur !== neighbor) {
        cycle.push(cur);
        cur = parent[cur];
      }
      cycle.push(neighbor);
      return true;
    }
  }
  return false;
};

for (let i = 1; i <= N; i++) {
  if (!visited[i]) {
    if (findCycle(i, -1)) break;
  }
}

const isCycleNode = Array(N + 1).fill(false);

for (const node of cycle) {
  isCycleNode[node] = true;
}

const distance = Array(N + 1).fill(-1);
const queue = [];
for (const node of cycle) {
  queue.push(node);
  distance[node] = 0;
}

while (queue.length) {
  const current = queue.shift();
  for (const neighbor of arr[current]) {
    if (distance[neighbor] === -1) {
      distance[neighbor] = distance[current] + 1;
      queue.push(neighbor);
    }
  }
}

let result = "";
for (let i = 1; i <= N; i++) {
  result += distance[i] + " ";
}
console.log(result.trim());