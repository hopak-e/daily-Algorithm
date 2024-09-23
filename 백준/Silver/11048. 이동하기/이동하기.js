let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array(M).fill(0));

dp[0][0] = arr[0][0];
for (let i = 1; i < N; i++) {
  dp[i][0] = dp[i - 1][0] + arr[i][0];
}

for (let j = 1; j < M; j++) {
  dp[0][j] = dp[0][j - 1] + arr[0][j];
}

for (let i = 1; i < N; i++) {
  for (let j = 1; j < M; j++) {
    dp[i][j] =
      Math.max(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + arr[i][j];
  }
}

console.log(dp[N - 1][M - 1]);
