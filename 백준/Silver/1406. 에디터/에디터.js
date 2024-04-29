const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[1]);
let left_stack = [...input[0]];
let right_stack = [];

for (let i = 2; i < N + 2; i++) {
  const [command, value] = input[i].split(" ");
  if (command === "L" && left_stack.length) {
    right_stack.push(left_stack.pop());
  } else if (command === "D" && right_stack.length) {
    left_stack.push(right_stack.pop());
  } else if (command === "B" && left_stack.length) {
    left_stack.pop();
  } else if (command === "P") {
    left_stack.push(value);
  }
}
const answer = left_stack.concat(right_stack.reverse()).join("");
console.log(answer);