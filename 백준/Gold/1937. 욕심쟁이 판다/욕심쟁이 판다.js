let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = parseInt(input[0]);
const forest = input.slice(1).map((line) => line.split(" ").map(Number));

// dp 배열: 각 위치에서 최대 이동 가능한 칸의 수를 저장
const dp = Array.from(Array(n), () => Array(n).fill(-1));

// 상, 하, 좌, 우 방향 설정
const directions = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

// DFS 함수 정의
function dfs(x, y) {
  if (dp[x][y] !== -1) return dp[x][y];

  dp[x][y] = 1; // 자기 자신 칸 포함

  for (const [dx, dy] of directions) {
    const nx = x + dx;
    const ny = y + dy;
    if (
      nx >= 0 &&
      nx < n &&
      ny >= 0 &&
      ny < n &&
      forest[nx][ny] > forest[x][y]
    ) {
      dp[x][y] = Math.max(dp[x][y], dfs(nx, ny) + 1);
    }
  }

  return dp[x][y];
}

let result = 0;
for (let i = 0; i < n; i++) {
  for (let j = 0; j < n; j++) {
    result = Math.max(result, dfs(i, j));
  }
}

console.log(result);
