let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const N = Number(input);
const MOD = 10007;
const dp = Array.from({ length: N }, () => Array(10).fill(0));
for (let i = 0; i < 10; i++) {
  dp[0][i] = 1;
}
for (let i = 1; i < N; i++) {
  for (let j = 0; j <= 9; j++) {
    dp[i][j] = dp[i - 1].slice(0, j + 1).reduce((a, c) => a + c, 0) % MOD;
  }
}
console.log(dp[N - 1].reduce((a, c) => a + c, 0) % MOD);