let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const board = input.slice(1).map((line) => line.split(" ").map(Number));

// DP 테이블 초기화
const dp = Array.from(Array(N), () => Array(N).fill(BigInt(0)));
dp[0][0] = BigInt(1); // 시작점 초기화

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (board[i][j] === 0 || dp[i][j] === BigInt(0)) continue;

    const jump = board[i][j];
    // 아래로 이동
    if (i + jump < N) {
      dp[i + jump][j] += dp[i][j];
    }
    // 오른쪽으로 이동
    if (j + jump < N) {
      dp[i][j + jump] += dp[i][j];
    }
  }
}

console.log(dp[N - 1][N - 1].toString());
