let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const tree = {};

for (let i = 1; i <= N; i++) {
  const [parent, left, right] = input[i].split(" ");
  tree[parent] = [left, right];
}

const pre = [];
const mid = [];
const post = [];

const makeArr = (node) => {
  if (node === ".") return;

  const [left, right] = tree[node];

  pre.push(node);
  makeArr(left);
  mid.push(node);
  makeArr(right);
  post.push(node);
};

makeArr("A");
console.log(pre.join(""));
console.log(mid.join(""));
console.log(post.join(""));
