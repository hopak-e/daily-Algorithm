let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((line) => line.split(" ").map(Number));

const dp = Array.from({ length: N }, () => Array(N).fill(Infinity));

const dimensions = arr.map((v) => v[0]);
dimensions.push(arr[N - 1][1]);

for (let i = 0; i < N; i++) {
  dp[i][i] = 0;
}

for (let length = 1; length < N; length++) {
  for (let i = 0; i + length < N; i++) {
    let j = i + length;
    for (let k = i; k < j; k++) {
      dp[i][j] = Math.min(
        dp[i][j],
        dp[i][k] +
          dp[k + 1][j] +
          dimensions[i] * dimensions[k + 1] * dimensions[j + 1]
      );
    }
  }
}

console.log(dp[0][N - 1]);
