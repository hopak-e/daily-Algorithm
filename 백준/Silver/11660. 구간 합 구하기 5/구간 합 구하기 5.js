let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

const arr = [];
for (let i = 1; i <= N; i++) {
  arr.push(input[i].split(" ").map(Number));
}

const order = [];
for (let i = N + 1; i <= N + M; i++) {
  order.push(input[i].split(" ").map(Number));
}

const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

for (let i = 1; i <= N; i++) {
  for (let j = 1; j <= N; j++) {
    dp[i][j] =
      arr[i - 1][j - 1] + dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1];
  }
}

const answer = [];
for (const [x1, y1, x2, y2] of order) {
  const sum =
    dp[x2][y2] -
    (y1 > 1 ? dp[x2][y1 - 1] : 0) -
    (x1 > 1 ? dp[x1 - 1][y2] : 0) +
    (x1 > 1 && y1 > 1 ? dp[x1 - 1][y1 - 1] : 0);
  answer.push(sum);
}
console.log(answer.join("\n"));
