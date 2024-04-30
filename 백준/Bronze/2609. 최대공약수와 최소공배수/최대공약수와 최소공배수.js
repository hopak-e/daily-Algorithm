const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

let [a, b] = input;
let num1 = input[0];
let num2 = input[1];
while (num1 % num2 !== 0) {
  let num = num1 % num2;
  if (num !== 0) {
    num1 = num2;
    num2 = num;
  }
}
console.log(num2);
console.log((a * b) / num2);