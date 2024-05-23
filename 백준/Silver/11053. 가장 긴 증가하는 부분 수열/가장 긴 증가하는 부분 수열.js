let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const N = input[0];
const arr = input[1];
const dp = Array(...N).fill(1);

for (let i = 1; i < N; i++) {
  const temp = [];
  for (let j = 0; j < i; j++) {
    if (arr[j] < arr[i]) {
      temp.push(dp[j]);
    }
  }
  if (temp.length !== 0) {
    dp[i] += Math.max(...temp);
  }
}
console.log(Math.max(...dp));
