let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);
const dp = Array.from({ length: N }).fill(0);

for (let i = 0; i < N; i++) {
  let tmp = 0;
  let idx = -1;

  for (let j = 0; j < i; j++) {
    if (nums[i] > nums[j] && dp[j] > tmp) {
      tmp = dp[j];
      idx = j;
    }
  }

  dp[i] = idx === -1 ? nums[i] : nums[i] + dp[idx];
}
console.log(Math.max(...dp));