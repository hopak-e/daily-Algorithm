let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
const dp = new Array(N + 1).fill(0);
let idx = 2;

for (let i = 1; i <= N; i++) {
  dp[i] = dp[i - 1] + arr[i - 1];
}

const answer = [];
for (let i = 0; i < M; i++) {
  const [a, b] = input[idx++].split(" ").map(Number);
  answer.push(dp[b] - dp[a - 1]);
}
console.log(answer.join("\n"));
