let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let max = 0;
let cur = 0;

for (let i = 0; i < K; i++) {
  cur += arr[i];
}

max = cur;

for (let i = K; i < N; i++) {
  cur = cur - arr[i - K] + arr[i];
  if (cur > max) {
    max = cur;
  }
}

console.log(max);
