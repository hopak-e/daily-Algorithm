const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input.shift());

let temp = 0;
function gcd(a, b) {
  while (b !== 0) {
    temp = a % b;
    a = b;
    b = temp;
  }
  return a;
}

const answer = [];
for (let i = 0; i < N; i++) {
  const nums = input[i].split(" ").map(Number);
  const len = Number(nums.shift());

  let sum = 0;
  for (let j = 0; j < len - 1; j++) {
    for (let k = j + 1; k < len; k++) {
      let result = gcd(nums[j], nums[k]);
      sum += result;
    }
  }
  answer.push(sum);
}

console.log(answer.join("\n"));