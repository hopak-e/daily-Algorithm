let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const buildTime = Array(N + 1).fill(0); // 각 건물의 건설 시간
const totalTime = Array(N + 1).fill(0); // 각 건물이 완성되는 데 걸리는 최소 시간
const inDegree = Array(N + 1).fill(0); // 각 건물의 진입 차수
const dependencies = Array.from(Array(N + 1), () => []); // 각 건물의 의존 관계

// 입력 처리
for (let i = 1; i <= N; i++) {
  const [time, ...prerequisites] = input[i].split(" ").map(Number);
  buildTime[i] = time;

  // 의존 관계 및 진입 차수 설정
  prerequisites.slice(0, -1).forEach((prereq) => {
    dependencies[prereq].push(i);
    inDegree[i]++;
  });
}

// 위상 정렬 및 최소 시간 계산
function topologySort() {
  const queue = [];

  // 초기 진입 차수가 0인 건물들을 큐에 추가
  for (let i = 1; i <= N; i++) {
    if (inDegree[i] === 0) {
      queue.push(i);
      totalTime[i] = buildTime[i];
    }
  }

  // 위상 정렬 수행
  while (queue.length) {
    const current = queue.shift();

    for (const next of dependencies[current]) {
      // 다음 건물에 대한 최소 시간을 업데이트
      totalTime[next] = Math.max(
        totalTime[next],
        totalTime[current] + buildTime[next]
      );

      // 진입 차수를 감소하고, 0이 되면 큐에 추가
      if (--inDegree[next] === 0) {
        queue.push(next);
      }
    }
  }
}

topologySort();
console.log(totalTime.slice(1).join("\n"));
