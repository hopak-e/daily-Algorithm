let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const N = input[0][0];

const dp = Array.from({ length: N }, () => []);

for (let i = 1; i <= N; i++) {
  const row = input[i];
  dp[i - 1].push(...row);
}

for (let i = 1; i < N; i++) {
  for (let j = 0; j < dp[i].length; j++) {
    if (j === 0) {
      dp[i][j] += dp[i - 1][j];
    } else if (j === dp[i].length - 1) {
      dp[i][j] += dp[i - 1][j - 1];
    } else {
      dp[i][j] += Math.max(dp[i - 1][j - 1], dp[i - 1][j]);
    }
  }
}
console.log(Math.max(...dp[N - 1]));