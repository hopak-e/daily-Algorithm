const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

let tmp = Number(input);
let num;
const answer = [];
while (tmp / -2 !== 0) {
  num = tmp % -2;
  if (num === -1 || num === 1) {
    tmp = Math.floor(tmp / -2) + 1;
    answer.push(1);
  } else if (num === 0) {
    tmp = Math.floor(tmp / -2);
    answer.push(0);
  }
}

console.log(answer.length === 0 ? 0 : answer.reverse().join(""));