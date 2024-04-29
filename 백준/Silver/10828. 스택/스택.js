const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const stack = [];
const answer = [];
for (let i = 1; i <= N; i++) {
  let left = input[i].split(" ")[0];
  let right = input[i].split(" ")[1];
  switch (left) {
    case "push":
      stack.push(right);
      break;
    case "pop":
      answer.push(stack.pop() || -1);
      break;
    case "size":
      answer.push(stack.length);
      break;
    case "empty":
      answer.push(stack.length === 0 ? 1 : 0);
      break;
    case "top":
      answer.push(stack[stack.length - 1] || -1);
  }
}

console.log(answer.join("\n"));