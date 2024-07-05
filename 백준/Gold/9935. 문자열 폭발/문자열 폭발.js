let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const str = input[0];
const bomb = input[1];

const stack = [];
const len = bomb.length;

for (let char of str) {
  stack.push(char);

  if (stack.length >= len) {
    let match = true;
    for (let i = 0; i < len; i++) {
      if (stack[stack.length - len + i] !== bomb[i]) {
        match = false;
        break;
      }
    }
    if (match) {
      for (let i = 0; i < len; i++) {
        stack.pop();
      }
    }
  }
}
console.log(stack.length === 0 ? "FRULA" : stack.join(""));
