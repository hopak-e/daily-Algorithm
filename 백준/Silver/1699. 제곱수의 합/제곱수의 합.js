let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const N = Number(input);
const dp = [0, 1];

for (let i = 1; i <= N; i++) {
  dp[i] = dp[i - 1] + 1;
  for (let j = 1; j <= Math.sqrt(i); j++) {
    if (dp[i - j ** 2] + 1 < dp[i]) {
      dp[i] = dp[i - j ** 2] + 1;
    }
  }
}
console.log(dp[N]);
