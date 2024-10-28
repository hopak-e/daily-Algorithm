let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const numbers = input[1].split(" ").map(Number);
numbers.sort((a, b) => a - b);

let count = 0;

for (let i = 0; i < N; i++) {
  const target = numbers[i];
  let left = 0;
  let right = N - 1;

  while (left < right) {
    if (left === i) {
      left++;
      continue;
    }
    if (right === i) {
      right--;
      continue;
    }

    const sum = numbers[left] + numbers[right];
    if (sum === target) {
      count++;
      break;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
}

console.log(count);
