let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input.shift();

function solution(num, memo = []) {
  memo[1] = 1;
  memo[2] = 2;
  memo[3] = 4;

  for (let i = 4; i <= 11; i++) {
    memo[i] = memo[i - 1] + memo[i - 2] + memo[i - 3];
  }

  for (let i = 0; i < num; i++) {
    console.log(memo[input[i]]);
  }
}

solution(N);