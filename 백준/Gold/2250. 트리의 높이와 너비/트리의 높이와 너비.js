let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const nodes = {};
const parent = new Array(N + 1).fill(-1);

for (let i = 1; i <= N; i++) {
  const [node, left, right] = input[i].split(" ").map(Number);
  nodes[node] = { left, right };
  if (left !== -1) parent[left] = node;
  if (right !== -1) parent[right] = node;
}

let root;
for (let i = 1; i <= N; i++) {
  if (parent[i] === -1) {
    root = i;
    break;
  }
}

const levelMin = new Array(N + 1).fill(Number.MAX_SAFE_INTEGER);
const levelMax = new Array(N + 1).fill(Number.MIN_SAFE_INTEGER);
let col = 1;

const inorder = (node, level) => {
  if (node === -1) return;

  inorder(nodes[node].left, level + 1);

  levelMin[level] = Math.min(levelMin[level], col);
  levelMax[level] = Math.max(levelMax[level], col);
  col++;

  inorder(nodes[node].right, level + 1);
};

inorder(root, 1);
let maxLevel = 1;
let maxWidth = levelMax[1] - levelMin[1] + 1;
for (let i = 2; i <= N; i++) {
  if (levelMax[i] === Number.MIN_SAFE_INTEGER) continue;
  const width = levelMax[i] - levelMin[i] + 1;
  if (width > maxWidth) {
    maxWidth = width;
    maxLevel = i;
  }
}
console.log(maxLevel, maxWidth);
