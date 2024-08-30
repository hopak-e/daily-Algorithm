let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, k] = input[0].split(" ").map(Number);
const arr = input.slice(1).map(Number);

const dp = Array(k + 1).fill(Infinity);

dp[0] = 0;

for (const coin of arr) {
  for (let i = coin; i <= k; i++) {
    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
  }
}

console.log(dp[k] === Infinity ? -1 : dp[k]);
