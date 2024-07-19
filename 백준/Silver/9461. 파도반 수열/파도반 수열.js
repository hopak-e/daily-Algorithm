let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input[0]);

let idx = 1;
for (let i = 0; i < T; i++) {
  const N = Number(input[idx++]);
  const dp = new Array(N).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  dp[2] = 1;
  dp[3] = 2;
  dp[4] = 2;
  for (let i = 5; i < N; i++) {
    dp[i] = dp[i - 5] + dp[i - 1];
  }
  console.log(dp[N - 1]);
}
