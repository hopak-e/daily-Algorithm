let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const dist = input[1].split(" ").map(Number);
const price = input[2].split(" ").map(Number);

let cost = 0;
let min = price[0];

for (let i = 0; i < N - 1; i++) {
  if (price[i] < min) {
    min = price[i];
  }
  cost += min * dist[i];
}

console.log(cost);
