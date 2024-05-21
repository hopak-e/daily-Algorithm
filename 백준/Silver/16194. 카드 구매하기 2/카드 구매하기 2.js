let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input.shift());
const cardArr = input.shift().split(" ").map(Number);
const memo = [0, ...cardArr];

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= i; j++) {
    memo[i] = Math.min(memo[i], memo[i - j] + cardArr[j - 1]);
  }
}
console.log(memo[N]);
