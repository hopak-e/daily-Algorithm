let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input.shift();
const max = Math.max(...input);

const dp = Array.from({ length: max + 1 }, () => new Array(4).fill(0));
dp[1][1] = dp[2][2] = dp[3][1] = dp[3][2] = dp[3][3] = 1;

for (let i = 4; i <= max; i++) {
  dp[i][1] = (dp[i - 1][2] + dp[i - 1][3]) % 1000000009;
  dp[i][2] = (dp[i - 2][1] + dp[i - 2][3]) % 1000000009;
  dp[i][3] = (dp[i - 3][1] + dp[i - 3][2]) % 1000000009;
}

let answer = [];
for (let i = 0; i < N; i++) {
  const sum =
    (dp[input[i]][1] + dp[input[i]][2] + dp[input[i]][3]) % 1000000009;
  answer.push(sum);
}

console.log(answer.join("\n"));
