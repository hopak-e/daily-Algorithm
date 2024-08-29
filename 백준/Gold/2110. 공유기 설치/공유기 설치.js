let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, C] = input[0].split(" ").map(Number);
const arr = input
  .slice(1)
  .map(Number)
  .sort((a, b) => a - b);

const solution = (dist) => {
  let count = 1;
  let last = arr[0];

  for (let i = 1; i < N; i++) {
    if (arr[i] - last >= dist) {
      count++;
      last = arr[i];
    }
  }
  return count >= C;
};

let left = 1;
let right = arr[N - 1] - arr[0];
let result = 0;

while (left <= right) {
  let mid = Math.floor((left + right) / 2);

  if (solution(mid)) {
    result = mid;
    left = mid + 1;
  } else {
    right = mid - 1;
  }
}

console.log(result);
