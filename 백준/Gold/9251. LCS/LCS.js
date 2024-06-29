let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const str1 = input[0];
const str2 = input[1];
const N1 = str1.length;
const N2 = str2.length;

const dp = Array.from({ length: N1 + 1 }, () => Array(N2 + 1).fill(0));

for (let i = 1; i <= N1; i++) {
  for (let j = 1; j <= N2; j++) {
    if (str1[i - 1] === str2[j - 1]) {
      dp[i][j] = dp[i - 1][j - 1] + 1;
    } else {
      dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
}
console.log(dp[N1][N2]);
