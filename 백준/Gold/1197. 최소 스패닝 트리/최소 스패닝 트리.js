let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

class DisjointSet {
  constructor(size) {
    this.parent = Array.from({ length: size }, (_, i) => i);
    this.rank = Array(size).fill(0);
  }

  find(u) {
    if (this.parent[u] !== u) {
      this.parent[u] = this.find(this.parent[u]);
    }
    return this.parent[u];
  }

  union(u, v) {
    const rootU = this.find(u);
    const rootV = this.find(v);

    if (rootU !== rootV) {
      if (this.rank[rootU] > this.rank[rootV]) {
        this.parent[rootV] = rootU;
      } else if (this.rank[rootU] < this.rank[rootV]) {
        this.parent[rootU] = rootV;
      } else {
        this.parent[rootV] = rootU;
        this.rank[rootU]++;
      }
    }
  }
}

const [V, E] = input[0].split(" ").map(Number);

const edges = [];
for (let i = 1; i <= E; i++) {
  const [A, B, C] = input[i].split(" ").map(Number);
  edges.push([C, A - 1, B - 1]);
}

edges.sort((a, b) => a[0] - b[0]);

const disjoinSet = new DisjointSet(V);

let weight = 0;
let count = 0;

for (const [w, u, v] of edges) {
  if (disjoinSet.find(u) !== disjoinSet.find(v)) {
    disjoinSet.union(u, v);
    weight += w;
    count++;
  }
  if (count === V - 1) break;
}

console.log(weight);
