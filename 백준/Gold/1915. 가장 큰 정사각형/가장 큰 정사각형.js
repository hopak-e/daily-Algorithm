let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const matrix = input.slice(1).map((line) => line.split("").map(Number));

const dp = Array.from({ length: n }, () => Array(m).fill(0));
let maxSideLength = 0;

for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (matrix[i][j] === 1) {
      if (i === 0 || j === 0) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
      }
      maxSideLength = Math.max(maxSideLength, dp[i][j]);
    }
  }
}

console.log(maxSideLength * maxSideLength);