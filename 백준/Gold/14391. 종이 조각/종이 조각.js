let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input.shift().split(" ").map(Number);
const paper = input.map(line => line.split('').map(Number));

let maxSum = 0;

for (let mask = 0; mask < (1 << (N * M)); mask++) {
  let sum = 0;

  for (let i = 0; i < N; i++) {
    let currentNumber = 0;
    for (let j = 0; j < M; j++) {
      const index = i * M + j;
      if ((mask & (1 << index)) !== 0) {
        currentNumber = currentNumber * 10 + paper[i][j];
      } else {
        sum += currentNumber;
        currentNumber = 0;
      }
    }
    sum += currentNumber; 
  }

  for (let j = 0; j < M; j++) {
    let currentNumber = 0;
    for (let i = 0; i < N; i++) {
      const index = i * M + j;
      if ((mask & (1 << index)) === 0) {
        currentNumber = currentNumber * 10 + paper[i][j];
      } else {
        sum += currentNumber;
        currentNumber = 0;
      }
    }
    sum += currentNumber;
  }

  maxSum = Math.max(maxSum, sum);
}

console.log(maxSum);