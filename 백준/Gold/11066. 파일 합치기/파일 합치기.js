let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let T = Number(input[0]);
let idx = 1;
let results = [];

for (let t = 0; t < T; t++) {
  const K = Number(input[idx]);
  const files = input[idx + 1].split(" ").map(Number); // 파일 크기 리스트
  idx += 2;

  // DP 테이블 초기화
  const dp = Array.from({ length: K }, () => Array(K).fill(0));
  const sum = Array(K).fill(0); // 파일 크기의 누적합 배열

  // 누적합 계산
  sum[0] = files[0];
  for (let i = 1; i < K; i++) {
    sum[i] = sum[i - 1] + files[i];
  }

  // 구간의 길이를 2부터 시작해서 차례대로 구간을 합친다
  for (let length = 2; length <= K; length++) {
    for (let i = 0; i <= K - length; i++) {
      const j = i + length - 1;
      dp[i][j] = Infinity;

      // i에서 j까지의 파일을 합치는 데 드는 최소 비용을 계산
      for (let k = i; k < j; k++) {
        const cost =
          dp[i][k] + dp[k + 1][j] + (sum[j] - (i > 0 ? sum[i - 1] : 0));
        dp[i][j] = Math.min(dp[i][j], cost);
      }
    }
  }

  // dp[0][K-1]이 모든 파일을 합치는 최소 비용이 된다.
  results.push(dp[0][K - 1]);
}

// 결과 출력
console.log(results.join("\n"));
