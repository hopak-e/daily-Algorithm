let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
const W = input.slice(1).map((line) => line.split(" ").map(Number));

// 무한대를 의미하는 값
const INF = 1e7 * N;
const dp = Array(1 << N)
  .fill(null)
  .map(() => Array(N).fill(INF));

// DP 초기 상태 설정 (0번 도시에서 시작)
dp[1][0] = 0;

// DP 계산
for (let visited = 1; visited < 1 << N; visited++) {
  for (let currentCity = 0; currentCity < N; currentCity++) {
    if (!(visited & (1 << currentCity))) continue; // 현재 도시를 방문한 적 없으면 건너뜀

    for (let nextCity = 0; nextCity < N; nextCity++) {
      if (visited & (1 << nextCity)) continue; // 이미 방문한 도시는 건너뜀
      if (W[currentCity][nextCity] === 0) continue; // 길이 없는 경우 건너뜀

      const nextVisited = visited | (1 << nextCity);
      dp[nextVisited][nextCity] = Math.min(
        dp[nextVisited][nextCity],
        dp[visited][currentCity] + W[currentCity][nextCity]
      );
    }
  }
}

// 모든 도시를 방문한 후 시작점으로 돌아오는 비용 계산
let minCost = INF;
for (let lastCity = 1; lastCity < N; lastCity++) {
  if (W[lastCity][0] !== 0) {
    minCost = Math.min(minCost, dp[(1 << N) - 1][lastCity] + W[lastCity][0]);
  }
}

console.log(minCost);
