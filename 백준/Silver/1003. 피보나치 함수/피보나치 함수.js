let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const MAX = 40;
const dp = Array.from({ length: MAX + 1 }, () => []);
dp[0] = [1, 0];
dp[1] = [0, 1];
dp[2] = [1, 1];

for (let i = 3; i <= MAX; i++) {
  const [left1, right1] = dp[i - 2];
  const [left2, right2] = dp[i - 3];
  dp[i] = [left1 * 2 + left2, right1 * 2 + right2];
}

const answer = [];
for (let i = 1; i <= N; i++) {
  const num = Number(input[i]);
  answer.push(`${dp[num][0]} ${dp[num][1]}`);
}
console.log(answer.join("\n"));
