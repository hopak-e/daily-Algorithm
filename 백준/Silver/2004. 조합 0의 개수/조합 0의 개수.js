const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

input.push(input[0] - input[1]);

const result2 = [];
const result5 = [];

for (let i = 0; i < input.length; i++) {
  let n2 = Number(input[i]);
  let n5 = Number(input[i]);
  let num2 = 0;
  let num5 = 0;

  while (n2 >= 2) {
    num2 += parseInt(n2 / 2);
    n2 /= 2;
  }
  result2.push(num2);

  while (n5 >= 5) {
    num5 += parseInt(n5 / 5);
    n5 /= 5;
  }
  result5.push(num5);
}
const answer2 = result2[0] - (result2[1] + result2[2]);
const answer5 = result5[0] - (result5[1] + result5[2]);
console.log(Math.min(answer2, answer5));
