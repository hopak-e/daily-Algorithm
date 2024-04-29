const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input.shift();
let answer = "";
const stack = [];
let cur = 1;

for (let i = 0; i < N; i++) {
  const num = input.shift();
  while (cur <= num) {
    stack.push(cur++);
    answer += "+ ";
  }

  const poped = stack.pop();
  if (poped !== num) {
    answer = "NO";
    break;
  }
  answer += "- ";
}

console.log(answer.split(" ").join("\n"));
