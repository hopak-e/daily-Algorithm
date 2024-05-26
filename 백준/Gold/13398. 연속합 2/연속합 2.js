let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);

const dp = Array.from({ length: N }).fill(0);
dp[0] = nums[0];

const dp2 = Array.from({ length: N }).fill(0);
dp2[0] = nums[0];

for (let i = 1; i < N; i++) {
  if (nums[i] + dp[i - 1] > nums[i]) {
    dp[i] = dp[i - 1] + nums[i];
  } else {
    dp[i] = nums[i];
  }
}

for (let i = 1; i < N; i++) {
  if (nums[i] + dp2[i - 1] < dp[i - 1]) {
    dp2[i] = dp[i - 1];
  } else {
    dp2[i] = nums[i] + dp2[i - 1];
  }
}

const dpMax = Math.max(...dp);
const dp2Max = Math.max(...dp2);
console.log(Math.max(dpMax, dp2Max));