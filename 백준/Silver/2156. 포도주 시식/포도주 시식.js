let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const [N, ...cases] = input;
const dp = Array.from({ length: N + 1 }).fill(0);
const wine = [0, ...cases];
dp[1] = wine[1];
dp[2] = wine[1] + wine[2];

for (let i = 3; i <= N; i++) {
  dp[i] = Math.max(
    dp[i - 3] + wine[i - 1] + wine[i],
    dp[i - 2] + wine[i],
    dp[i - 1]
  );
}

console.log(dp[N]);