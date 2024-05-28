let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const N = Number(input);
let answer = 0;
let len = 1;
let num = 10;
for (let i = 1; i <= N; i++) {
  if (i % num === 0) {
    len++;
    num *= 10;
  }
  answer += len;
}
console.log(answer);
