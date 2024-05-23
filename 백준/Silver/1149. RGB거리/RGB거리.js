let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const N = input.shift();
const cost = input;
const dp = Array.from({ length: N }, () => Array(3).fill(0));

dp[0][0] = cost[0][0];
dp[0][1] = cost[0][1];
dp[0][2] = cost[0][2];

for (let i = 1; i < N; i++) {
  dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + cost[i][0];
  dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + cost[i][1];
  dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + cost[i][2];
}
const answer = Math.min(dp[N - 1][0], dp[N - 1][1], dp[N - 1][2]);
console.log(answer);