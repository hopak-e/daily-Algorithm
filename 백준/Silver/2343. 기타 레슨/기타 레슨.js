let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let left = Math.max(...arr);
let right = arr.reduce((acc, len) => acc + len, 0);

function solution(mid) {
  let count = 1;
  let len = 0;

  for (let i = 0; i < N; i++) {
    if (len + arr[i] > mid) {
      count++;
      len = 0;
    }
    len += arr[i];
  }
  return count <= M;
}

while (left < right) {
  const mid = Math.floor((left + right) / 2);

  if (solution(mid)) {
    right = mid;
  } else {
    left = mid + 1;
  }
}

console.log(left);
