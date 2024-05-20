let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();
const N = Number(input);

const answer = { 1: 1, 2: 2 };

for (let i = 3; i <= N; i++) {
  answer[i] = (answer[i - 1] + answer[i - 2]) % 10007;
}

console.log(answer[input]);
