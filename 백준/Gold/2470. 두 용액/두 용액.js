let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

arr.sort((a, b) => a - b);

let left = 0;
let right = N - 1;

let result = Infinity;
let answer = [];

while (left < right) {
  const sum = arr[left] + arr[right];

  if (Math.abs(sum) < Math.abs(result)) {
    result = sum;
    answer = [arr[left], arr[right]];
  }

  if (sum > 0) {
    right--;
  } else {
    left++;
  }
}

console.log(answer.join(" "));
