let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function cal([x1, y1], [x2, y2]) {
  return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
}

const edges = [];
for (let i = 0; i < n; i++) {
  for (let j = i + 1; j < n; j++) {
    edges.push([i, j, cal(arr[i], arr[j])]);
  }
}

edges.sort((a, b) => a[2] - b[2]);

const parent = Array.from({ length: n }, (_, i) => i);

function find(x) {
  if (parent[x] !== x) parent[x] = find(parent[x]);
  return parent[x];
}

function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);
  if (rootX !== rootY) parent[rootY] = rootX;
}

let mstCost = 0;
let edgeCount = 0;

for (const [u, v, cost] of edges) {
  if (find(u) !== find(v)) {
    union(u, v);
    mstCost += cost;
    edgeCount++;
    if (edgeCount === n - 1) break;
  }
}

console.log(mstCost.toFixed(2));
