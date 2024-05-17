let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [A, B] = input[0];
const [N] = input[1];
const nums = input[2].reverse();

const answer = [];
let result = 0;
for (let i = 0; i < N; i++) {
  result += nums[i] * A ** i;
}

if (result === 0) {
  console.log(0);
} else {
  while (result > 0) {
    answer.unshift(result % B);
    result = Math.floor(result / B);
  }
  console.log(answer.join(" "));
}
