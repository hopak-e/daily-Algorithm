let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input.shift());
const arr = input.map((v) => v.split(" ").map(Number));

function solution() {
  const dp = new Array(N).fill(0);
  for (let i = 0; i < N; i++) {
    const [period, profit] = arr[i];
    if (i + period > N) continue;
    dp[i] = dp[i] + profit;
    for (let j = i + period; j < N; j++) {
      dp[j] = Math.max(dp[j], dp[i]);
    }
  }
  return Math.max(...dp);
}
console.log(solution());