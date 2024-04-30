const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const answer = [];
const maxNum = Math.max(...input);
const primeNumbers = new Array(maxNum + 1).fill(true);
primeNumbers[0] = false;
primeNumbers[1] = false;

for (let i = 2; i <= Math.sqrt(maxNum); i++) {
  if (primeNumbers[i]) {
    for (let j = i * i; j <= maxNum; j += i) {
      primeNumbers[j] = false;
    }
  }
}

for (let i = 0; i < input.length - 1; i++) {
  let result = "Goldbach's conjecture is wrong.";

  for (let j = 3; j < input[i]; j += 2) {
    if (primeNumbers[j] && primeNumbers[input[i] - j]) {
      result = `${input[i]} = ${j} + ${input[i] - j}`;
      break;
    }
  }
  answer.push(result);
}

console.log(answer.join("\n"));
