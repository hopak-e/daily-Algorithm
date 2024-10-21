let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input);

const dp = Array(N + 1).fill(0);
const path = Array(N + 1).fill(0);

for (let i = 2; i <= N; i++) {
  dp[i] = dp[i - 1] + 1;
  path[i] = i - 1;

  if (i % 2 === 0 && dp[i] > dp[i / 2] + 1) {
    dp[i] = dp[i / 2] + 1;
    path[i] = i / 2;
  }

  if (i % 3 === 0 && dp[i] > dp[i / 3] + 1) {
    dp[i] = dp[i / 3] + 1;
    path[i] = i / 3;
  }
}

console.log(dp[N]);

const result = [];
let cur = N;
while (cur !== 0) {
  result.push(cur);
  cur = path[cur];
}

console.log(result.join(" "));
