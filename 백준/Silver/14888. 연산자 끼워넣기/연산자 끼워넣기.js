let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const numbers = input[1].split(" ").map(Number);
let [plus, minus, multiply, divide] = input[2].split(" ").map(Number);

let max = -Infinity;
let min = Infinity;

const dfs = (idx, current) => {
  if (idx === N) {
    max = Math.max(max, current);
    min = Math.min(min, current);
    return;
  }

  if (plus > 0) {
    plus--;
    dfs(idx + 1, current + numbers[idx]);
    plus++;
  }

  if (minus > 0) {
    minus--;
    dfs(idx + 1, current - numbers[idx]);
    minus++;
  }

  if (multiply > 0) {
    multiply--;
    dfs(idx + 1, current * numbers[idx]);
    multiply++;
  }

  if (divide > 0) {
    divide--;
    let result = Math.floor(Math.abs(current) / numbers[idx]);
    if (current < 0) result = -result;
    dfs(idx + 1, result);
    divide++;
  }
};
dfs(1, numbers[0]);

console.log(max ? max : 0);
console.log(min);
