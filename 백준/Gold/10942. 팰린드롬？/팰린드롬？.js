let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const sequence = input[1].split(" ").map(Number);
const M = parseInt(input[2]);
const queries = input
  .slice(3)
  .map((line) => line.split(" ").map((num) => parseInt(num) - 1));

const dp = Array.from(Array(N), () => Array(N).fill(0));

for (let i = 0; i < N; i++) {
  dp[i][i] = 1;
}

for (let i = 0; i < N - 1; i++) {
  if (sequence[i] === sequence[i + 1]) dp[i][i + 1] = 1;
}

for (let length = 3; length <= N; length++) {
  for (let i = 0; i <= N - length; i++) {
    const j = i + length - 1;
    if (sequence[i] === sequence[j] && dp[i + 1][j - 1] === 1) {
      dp[i][j] = 1;
    }
  }
}

const result = queries.map(([S, E]) => dp[S][E]);
console.log(result.join("\n"));
