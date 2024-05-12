let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let num = input[0];
let base = input[1];

const answer = [];
let tmp = num;

while (tmp / base !== 0) {
  answer.push(tmp % base);
  tmp = Math.floor(tmp / base);
}

answer.reverse();

for (let i = 0; i < answer.length; i++) {
  if (answer[i] >= 10 && answer[i] <= 35) {
    answer[i] = String.fromCharCode(answer[i] + 55);
  }
}

console.log(answer.join("").trim());