const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString();

const N = input.length;
let answer = input.split(" ");
console.log(
  Number(String(answer[0]) + String(answer[1])) +
    Number(String(answer[2]) + String(answer[3]))
);
