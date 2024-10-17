let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const k = parseInt(input[1]);

function countLessOrEqual(mid, N) {
  let count = 0;
  for (let i = 1; i <= N; i++) {
    count += Math.min(N, Math.floor(mid / i));
  }
  return count;
}

let left = 1;
let right = N * N;
let answer = 0;

while (left <= right) {
  const mid = Math.floor((left + right) / 2);
  if (countLessOrEqual(mid, N) >= k) {
    answer = mid;
    right = mid - 1;
  } else {
    left = mid + 1;
  }
}

console.log(answer);
