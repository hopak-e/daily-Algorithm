let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let idx = 0;
const T = Number(input[idx++]);

for (let t = 0; t < T; t++) {
  const [N, K] = input[idx++].split(" ").map(Number); // 건물의 개수 N, 규칙의 개수 K
  const buildTimes = input[idx++].split(" ").map(Number); // 각 건물당 건설에 걸리는 시간

  const adj = Array.from({ length: N + 1 }, () => []); // 건물 간의 의존 관계를 나타내는 인접 리스트
  const indegree = Array(N + 1).fill(0); // 진입 차수(앞서 지어야 하는 건물 수)
  const dp = Array(N + 1).fill(0); // 각 건물을 짓기까지 걸리는 시간 저장

  // 건설 순서 규칙 입력
  for (let i = 0; i < K; i++) {
    const [X, Y] = input[idx++].split(" ").map(Number);
    adj[X].push(Y); // X 건물을 지은 후 Y 건물을 지을 수 있음
    indegree[Y]++; // Y 건물의 진입 차수를 증가시킴
  }

  const W = Number(input[idx++]); // 백준이가 승리하기 위해 건설해야 할 건물의 번호

  // 위상 정렬을 위한 큐
  const queue = [];

  // 진입 차수가 0인 건물들을 큐에 넣고, 해당 건물의 건설 시간을 dp에 저장
  for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0) {
      queue.push(i);
      dp[i] = buildTimes[i - 1]; // dp에 건설 시간을 저장
    }
  }

  // 위상 정렬 시작
  while (queue.length > 0) {
    const current = queue.shift();

    // 현재 건물 이후에 지을 수 있는 건물들을 확인
    for (const next of adj[current]) {
      indegree[next]--; // 진입 차수 감소
      dp[next] = Math.max(dp[next], dp[current] + buildTimes[next - 1]); // 더 오래 걸리는 시간 선택

      // 진입 차수가 0이 되면 큐에 넣음
      if (indegree[next] === 0) {
        queue.push(next);
      }
    }
  }

  console.log(dp[W]);
}
