let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const result = Array(N).fill(0);
const stack = [];

for (let i = 0; i < N; i++) {
  while (stack.length && stack[stack.length - 1][1] <= arr[i]) {
    stack.pop();
  }
  if (stack.length > 0) {
    result[i] = stack[stack.length - 1][0] + 1;
  }
  stack.push([i, arr[i]]);
}

console.log(result.join(" "));
