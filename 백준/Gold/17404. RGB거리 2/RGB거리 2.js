let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const cost = input.slice(1).map((v) => v.split(" ").map(Number));
const INF = Number.MAX_SAFE_INTEGER;
let minCost = INF;

for (let first = 0; first < 3; first++) {
  const dp = Array.from({ length: N }, () => Array(3).fill(INF));
  dp[0][first] = cost[0][first];

  for (let i = 1; i < N; i++) {
    dp[i][0] = Math.min(dp[i - 1][1], dp[i - 1][2]) + cost[i][0];
    dp[i][1] = Math.min(dp[i - 1][0], dp[i - 1][2]) + cost[i][1];
    dp[i][2] = Math.min(dp[i - 1][0], dp[i - 1][1]) + cost[i][2];
  }

  for (let last = 0; last < 3; last++) {
    if (first !== last) {
      minCost = Math.min(minCost, dp[N - 1][last]);
    }
  }
}
console.log(minCost);