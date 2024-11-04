let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [R, C, M] = input[0].split(" ").map(Number);
const sharks = input.slice(1).map((line) => line.split(" ").map(Number));

const directions = [null, [-1, 0], [1, 0], [0, 1], [0, -1]]; 
let grid = Array.from({ length: R }, () => Array(C).fill(null));
let totalSize = 0;

// 초기 상어 배치
for (let [r, c, s, d, z] of sharks) {
  r--;
  c--;
  if (d <= 2) s %= (R - 1) * 2; // 세로 이동
  else s %= (C - 1) * 2; // 가로 이동
  grid[r][c] = { s, d, z };
}

// 낚시왕이 오른쪽으로 이동하면서 상어를 잡는 시뮬레이션
for (let fisher = 0; fisher < C; fisher++) {
  // 1. 낚시왕이 있는 열의 가장 가까운 상어 잡기
  for (let row = 0; row < R; row++) {
    if (grid[row][fisher]) {
      totalSize += grid[row][fisher].z;
      grid[row][fisher] = null;
      break;
    }
  }

  // 2. 상어 이동
  const newGrid = Array.from({ length: R }, () => Array(C).fill(null));
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (grid[r][c]) {
        let { s, d, z } = grid[r][c];
        let [dr, dc] = directions[d];
        let nr = r,
          nc = c;

        for (let move = 0; move < s; move++) {
          if (nr + dr < 0 || nr + dr >= R || nc + dc < 0 || nc + dc >= C) {
            d = d % 2 === 0 ? d - 1 : d + 1; // 방향 전환
            [dr, dc] = directions[d];
          }
          nr += dr;
          nc += dc;
        }

        // 이동한 위치에 상어가 없거나, 현재 상어가 더 크면 위치 갱신
        if (!newGrid[nr][nc] || newGrid[nr][nc].z < z) {
          newGrid[nr][nc] = { s, d, z };
        }
      }
    }
  }
  grid = newGrid;
}

console.log(totalSize);
