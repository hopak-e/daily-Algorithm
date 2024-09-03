let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input[0]);
let idx = 1;
const result = [];

for (let t = 0; t < T; t++) {
  const N = Number(input[idx]);
  const arr = [];

  for (let i = 0; i < N; i++) {
    arr.push(input[idx + 1 + i].split(" ").map(Number));
  }

  arr.sort((a, b) => a[0] - b[0]);

  let count = 1;
  let minInterview = arr[0][1];

  for (let i = 1; i < N; i++) {
    if (arr[i][1] < minInterview) {
      count++;
      minInterview = arr[i][1];
    }
  }

  result.push(count);
  idx += N + 1;
}

console.log(result.join("\n"));
