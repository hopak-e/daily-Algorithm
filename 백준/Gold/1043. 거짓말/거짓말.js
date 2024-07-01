let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const truth = input[1].split(" ").map(Number).slice(1);

const party = input.slice(2).map((v) => v.split(" ").map(Number).slice(1));

const parent = Array.from({ length: N + 1 }, (_, idx) => idx);

function find(x) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
}

function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);
  if (rootX !== rootY) {
    parent[rootY] = rootX;
  }
}

for (let i = 1; i < truth.length; i++) {
  union(truth[0], truth[i]);
}

party.forEach((v) => {
  for (let i = 1; i < v.length; i++) {
    union(v[0], v[i]);
  }
});

const truthSet = new Set(truth.map((v) => find(v)));

let count = 0;

party.forEach((v) => {
  if (!v.some((t) => truthSet.has(find(t)))) {
    count++;
  }
});

console.log(count);
