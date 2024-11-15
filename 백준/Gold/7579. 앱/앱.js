let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const memories = input[1].split(" ").map(Number);
const costs = input[2].split(" ").map(Number);

const maxCost = costs.reduce((acc, val) => acc + val, 0);
const dp = Array(maxCost + 1).fill(0);

// DP를 이용해 비용 대비 최대 확보 메모리를 계산
for (let i = 0; i < N; i++) {
  const memory = memories[i];
  const cost = costs[i];

  // 역순으로 순회하며 DP 갱신 (배낭 문제 접근)
  for (let j = maxCost; j >= cost; j--) {
    dp[j] = Math.max(dp[j], dp[j - cost] + memory);
  }
}

// 필요한 메모리 M을 확보하기 위한 최소 비용 찾기
let result = maxCost;
for (let i = 0; i <= maxCost; i++) {
  if (dp[i] >= M) {
    result = i;
    break;
  }
}

console.log(result);