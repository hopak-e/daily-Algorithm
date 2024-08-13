let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input[0]);

const MAX = 10000;
const isPrime = Array(MAX + 1).fill(true);

isPrime[0] = isPrime[1] = false;

for (let i = 2; i * i <= MAX; i++) {
  if (isPrime[i]) {
    for (let j = i * i; j <= MAX; j += i) {
      isPrime[j] = false;
    }
  }
}

let result = [];

for (let t = 1; t <= T; t++) {
  const n = Number(input[t]);
  let partition = null;

  for (let i = n / 2; i >= 2; i--) {
    if (isPrime[i] && isPrime[n - i]) {
      partition = [i, n - i];
      break;
    }
  }

  if (partition) {
    result.push(partition.join(" "));
  }
}

console.log(result.join("\n"));
