let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const S = input[2];

const io = "IO";
const str = io.repeat(N) + "I";

let count = 0;
for (let i = 0; i < M; i++) {
  if (S.slice(i, i + 2 * N + 1) === str) {
    count++;
  }
}
console.log(count);
