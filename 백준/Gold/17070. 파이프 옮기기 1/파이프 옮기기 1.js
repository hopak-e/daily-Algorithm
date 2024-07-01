let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const dp = Array.from({ length: N }, () =>
  Array.from({ length: N }, () => [0, 0, 0])
);
dp[0][1][0] = 1;

for (let r = 0; r < N; r++) {
  for (let c = 1; c < N; c++) {
    if (arr[r][c] === 1) continue;

    if (c > 0 && arr[r][c - 1] === 0) {
      dp[r][c][0] += dp[r][c - 1][0];
      dp[r][c][0] += dp[r][c - 1][2];
    }

    if (r > 0 && arr[r - 1][c] === 0) {
      dp[r][c][1] += dp[r - 1][c][1];
      dp[r][c][1] += dp[r - 1][c][2];
    }

    if (
      r > 0 &&
      c > 0 &&
      arr[r - 1][c] === 0 &&
      arr[r][c - 1] === 0 &&
      arr[r - 1][c - 1] === 0
    ) {
      dp[r][c][2] += dp[r - 1][c - 1][0];
      dp[r][c][2] += dp[r - 1][c - 1][1];
      dp[r][c][2] += dp[r - 1][c - 1][2];
    }
  }
}
console.log(dp[N - 1][N - 1][0] + dp[N - 1][N - 1][1] + dp[N - 1][N - 1][2]);
