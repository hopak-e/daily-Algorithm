let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0], 10);
const [S, M, L, XL, XXL, XXXL] = input[1].split(" ").map(Number);
const [T, P] = input[2].split(" ").map(Number);

const sizes = [S, M, L, XL, XXL, XXXL];
let tshirtBundles = 0;
for (let size of sizes) {
  tshirtBundles += Math.ceil(size / T);
}

const penBundles = Math.floor(N / P);
const singlePens = N % P;

console.log(tshirtBundles);
console.log(penBundles, singlePens);
