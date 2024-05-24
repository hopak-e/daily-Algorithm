let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, ...cases] = input;

for (let i = 0; i < N; i++) {
  let len = Number(input[i * 3 + 1]);
  let one = cases[i * 3 + 1].split(" ").map(Number);
  let two = cases[i * 3 + 2].split(" ").map(Number);

  const dp = Array.from({ length: len }, () => [0, 0, 0]);
  dp[0][1] = one[0];
  dp[0][2] = two[0];
  for (let j = 1; j < len; j++) {
    dp[j][0] = Math.max(dp[j - 1][1], dp[j - 1][2]);
    dp[j][1] = Math.max(dp[j - 1][0], dp[j - 1][2]) + one[j];
    dp[j][2] = Math.max(dp[j - 1][0], dp[j - 1][1]) + two[j];
  }
  console.log(Math.max(...dp[len - 1]));
}
