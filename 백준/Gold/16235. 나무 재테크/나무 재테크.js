let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, K] = input[0].split(" ").map(Number);
const A = input.slice(1, N + 1).map((line) => line.split(" ").map(Number));
const trees = Array.from(Array(N), () => Array.from(Array(N), () => []));
const nutrients = Array.from(Array(N), () => Array(N).fill(5));

for (let i = N + 1; i < N + 1 + M; i++) {
  const [x, y, age] = input[i].split(" ").map(Number);
  trees[x - 1][y - 1].push(age);
}

// 방향 벡터 (상하좌우 대각선 8방향)
const directions = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];
//나이만큼 양분 먹어야함
//봄 - 나이 어린애들부터 양분 먹을수 있음 양분 못채우면 사망 양분 채우면 +1
//여름 - 죽은 나무 / 2 양분으로 변함
//겨울 - 나무 나이/5 만큼 번식 -> 인접 8칸 나이 1인 나무 생성 
//아.. 처음에 5씩 있고 각 칸에 잇는 숫자만큼 양분이 증가함 
for (let year = 0; year < K; year++) {
  // 봄과 여름
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (trees[i][j].length === 0) continue;

      let alive = [];
      let deadNutrients = 0;

      // 나무가 어린 순서대로 정렬하여 양분 소비
      trees[i][j].sort((a, b) => a - b);
      for (let age of trees[i][j]) {
        if (nutrients[i][j] >= age) {
          nutrients[i][j] -= age;
          alive.push(age + 1);
        } else {
          deadNutrients += Math.floor(age / 2);
        }
      }
      trees[i][j] = alive;
      nutrients[i][j] += deadNutrients;
    }
  }

  // 가을
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      for (let age of trees[i][j]) {
        if (age % 5 === 0) {
          for (let [dx, dy] of directions) {
            const nx = i + dx;
            const ny = j + dy;
            if (nx >= 0 && nx < N && ny >= 0 && ny < N) {
              trees[nx][ny].push(1);
            }
          }
        }
      }
    }
  }

  // 겨울
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      nutrients[i][j] += A[i][j];
    }
  }
}

// K년 후 살아남은 나무 수 세기
let count = 0;
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    count += trees[i][j].length;
  }
}

console.log(count);
