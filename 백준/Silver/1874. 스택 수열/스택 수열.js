let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
const N = input[0];

let cur = 1;
const stack = [];
let result = "YES";
const answer = [];
for (let i = 1; i <= N; i++) {
  const num = input[i];
  while (cur <= num) {
    stack.push(cur++);
    answer.push("+");
  }
  const poped = stack.pop();
  if (poped !== num) {
    result = "NO";
    break;
  }
  answer.push("-");
}
console.log(result === "YES" ? answer.join("\n") : result);