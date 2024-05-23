let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input.shift();
const max = Math.max(...input);
const MOD = 1000000009;
const dp = Array.from({ length: max + 1 }).fill(0);
dp[1] = 1;
dp[2] = 2;
dp[3] = 4;

for (let i = 4; i <= max; i++) {
  dp[i] = (dp[i - 1] % MOD) + (dp[i - 2] % MOD) + (dp[i - 3] % MOD);
}
const answer = [];
for (let i = 0; i < N; i++) {
  answer.push(dp[input[i]] % MOD);
}
console.log(answer.join("\n"));