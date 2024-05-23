let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const [N, K] = input;
const dp = [];

for (let i = 1; i <= K; i++) {
  dp[i] = new Array(N + 1).fill(i === 1 ? 1 : 0);
  dp[i][0] = 1;
}
for (let i = 2; i <= K; i++) {
  for (let j = 1; j <= N; j++) {
    dp[i][j] = (dp[i - 1][j] + dp[i][j - 1]) % 1000000000;
  }
}
console.log(dp[K][N]);