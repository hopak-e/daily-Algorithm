let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

// 전깃줄 정보 배열 저장
let wires = [];
for (let i = 1; i <= N; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  wires.push([a, b]);
}

// 전봇대 A를 기준으로 오름차순 정렬
wires.sort((a, b) => a[0] - b[0]);

// LIS를 구하기 위한 DP 배열
let dp = new Array(N).fill(1);

// 전봇대 B에서 LIS 구하기
for (let i = 1; i < N; i++) {
  for (let j = 0; j < i; j++) {
    if (wires[i][1] > wires[j][1]) {
      dp[i] = Math.max(dp[i], dp[j] + 1);
    }
  }
}

// 가장 긴 증가하는 부분 수열(LIS)의 길이
const lisLength = Math.max(...dp);

// 없애야 하는 전깃줄의 수는 전체 전깃줄 수에서 LIS의 길이를 뺀 값
console.log(N - lisLength);
