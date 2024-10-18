let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map(Number);

const plus = [];
const minus = [];
let zero = 0;
let ones = 0;
let total = 0;

for (let num of arr) {
  if (num > 1) {
    plus.push(num);
  } else if (num < 0) {
    minus.push(num);
  } else if (num === 1) {
    ones += 1;
  } else if (num === 0) {
    zero++;
  }
}

plus.sort((a, b) => b - a);
minus.sort((a, b) => a - b);

for (let i = 0; i < plus.length; i += 2) {
  if (i + 1 < plus.length) {
    total += plus[i] * plus[i + 1];
  } else {
    total += plus[i];
  }
}

for (let i = 0; i < minus.length; i += 2) {
  if (i + 1 < minus.length) {
    total += minus[i] * minus[i + 1];
  } else {
    if (zero > 0) {
      continue;
    } else {
      total += minus[i];
    }
  }
}
total += ones;
console.log(total);
