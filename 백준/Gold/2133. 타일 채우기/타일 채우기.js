let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(input[0]);
const dp = Array.from({ length: 31 }).fill(0);
dp[1] = 0;
dp[2] = 3;
for (let i = 4; i <= N; i += 2) {
  dp[i] = dp[i - 2] * 3 + 2;
  for (let j = i - 4; j >= 0; j -= 2) {
    dp[i] += dp[j] * 2;
  }
}
console.log(dp[N]);