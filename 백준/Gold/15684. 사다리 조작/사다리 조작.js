let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, H] = input[0].split(" ").map(Number);
const ladder = Array.from({ length: H + 1 }, () => Array(N + 1).fill(0));

// 주어진 가로선 입력 처리
for (let i = 1; i <= M; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  ladder[a][b] = 1;
}

// 사다리 게임 결과가 각 세로선이 자기 자신으로 돌아오는지 확인하는 함수
function isCorrect() {
  for (let start = 1; start <= N; start++) {
    let k = start;
    for (let h = 1; h <= H; h++) {
      if (ladder[h][k]) {
        k++; // 오른쪽으로 이동
      } else if (ladder[h][k - 1]) {
        k--; // 왼쪽으로 이동
      }
    }
    if (k !== start) return false;
  }
  return true;
}

// 백트래킹을 사용하여 최소 가로선 개수를 찾는 함수
let result = -1;
function dfs(count, x, y) {
  if (count >= 4) return; // 최대 3개까지 시도, 4개 이상이면 종료

  if (isCorrect()) {
    if (result === -1 || count < result) {
      result = count;
    }
    return;
  }

  for (let i = x; i <= H; i++) {
    for (let j = i === x ? y : 1; j < N; j++) {
      // 가로선을 추가할 수 있는 위치인지 확인
      if (!ladder[i][j] && !ladder[i][j - 1] && !ladder[i][j + 1]) {
        ladder[i][j] = 1;
        dfs(count + 1, i, j + 2); // 백트래킹, 다음 위치로 이동
        ladder[i][j] = 0; // 원상복구
      }
    }
  }
}

// 초기 DFS 호출
dfs(0, 1, 1);
console.log(result);
