let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, K] = input[0].split(" ").map(Number);

let count = 0;
let sum = 0;
for (let i = N; i >= 1; i--) {
  const coin = Number(input[i]);

  if (coin <= K - sum) {
    const coinCount = Math.floor((K - sum) / coin);
    sum += coinCount * coin;
    count += coinCount;
  }
}

console.log(count);
