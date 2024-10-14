let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const arr = input[1].split(" ").map(Number);

let left = 0;
let right = N - 1;
let closestSum = Infinity;
let result = [arr[left], arr[right]];

while (left < right) {
  const sum = arr[left] + arr[right];

  if (Math.abs(sum) < Math.abs(closestSum)) {
    closestSum = sum;
    result = [arr[left], arr[right]];
  }

  if (sum < 0) {
    left++;
  } else if (sum > 0) {
    right--;
  } else {
    break;
  }
}

console.log(result[0], result[1]);
