let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const N = Number(input);
const MOD = 9901;
const dp = Array.from({ length: N }, () => Array(3).fill(0));
dp[0][0] = dp[0][1] = dp[0][2] = 1;

for (let i = 1; i < N; i++) {
  dp[i][0] = (dp[i - 1][1] + dp[i - 1][2])%MOD;
  dp[i][1] = (dp[i - 1][0] + dp[i - 1][2])%MOD;
  dp[i][2] = (dp[i - 1][0] + dp[i - 1][1] + dp[i - 1][2])%MOD;
}
const answer = (dp[N - 1][0] + dp[N - 1][1] + dp[N - 1][2]) % MOD;
console.log(answer);
