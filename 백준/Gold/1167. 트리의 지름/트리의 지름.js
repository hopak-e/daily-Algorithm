let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const V = Number(input[0]);

const solution = () => {
  const graph = Array.from({ length: V + 1 }, () => []);

  for (let i = 1; i <= V; i++) {
    const arr = input[i].split(" ").map(Number);
    const node = arr[0];

    let j = 1;
    while (j < arr.length - 1) {
      const neighbor = arr[j];
      const dist = arr[j + 1];
      graph[node].push({ node: neighbor, dist });
      j += 2;
    }
  }

  let maxDistance = 0;
  let farthestNode = 0;
  let visited = new Array(V + 1).fill(false);

  const dfs = (node, distance) => {
    visited[node] = true;

    if (distance > maxDistance) {
      maxDistance = distance;
      farthestNode = node;
    }

    for (const { node: nextNode, dist } of graph[node]) {
      if (!visited[nextNode]) {
        dfs(nextNode, distance + dist);
      }
    }
  };
  dfs(1, 0);

  visited = new Array(V + 1).fill(false);
  maxDistance = 0;

  dfs(farthestNode, 0);

  return maxDistance;
};
console.log(solution());
