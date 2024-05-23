let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const N = input[0];
const arr = input[1];

let maxNum = arr[0];
let num = arr[0];
for (let i = 1; i < N; i++) {
  if (maxNum < 0 && arr[i] > maxNum) {
    num = arr[i];
    maxNum = arr[i];
  } else if (num + arr[i] > 0) {
    num += arr[i];
    if (num > maxNum) {
      maxNum = num;
    }
  } else {
    num = 0;
  }
}
console.log(maxNum);
