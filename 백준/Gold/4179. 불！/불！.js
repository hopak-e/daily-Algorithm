let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [R, C] = input[0].split(" ").map(Number);
const maze = input.slice(1).map((line) => line.split(""));

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const fireQueue = [];
let jihoonQueue = [];
let jihoonVisited = Array.from({ length: R }, () => Array(C).fill(false));
let fireTime = Array.from({ length: R }, () => Array(C).fill(Infinity));

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (maze[i][j] === "J") {
      jihoonQueue.push([i, j, 0]); // 지훈이의 위치와 초기 시간
      jihoonVisited[i][j] = true;
    } else if (maze[i][j] === "F") {
      fireQueue.push([i, j, 0]); // 불의 위치와 초기 시간
      fireTime[i][j] = 0;
    }
  }
}

// 불의 확산 시간 계산
while (fireQueue.length > 0) {
  const [fx, fy, fTime] = fireQueue.shift();

  for (const [dx, dy] of directions) {
    const nx = fx + dx;
    const ny = fy + dy;

    if (
      nx >= 0 &&
      nx < R &&
      ny >= 0 &&
      ny < C &&
      maze[nx][ny] === "." &&
      fireTime[nx][ny] === Infinity
    ) {
      fireTime[nx][ny] = fTime + 1;
      fireQueue.push([nx, ny, fTime + 1]);
    }
  }
}

// 지훈이의 탈출 경로 계산
while (jihoonQueue.length > 0) {
  const [jx, jy, jTime] = jihoonQueue.shift();

  // 가장자리 탈출 체크
  if (jx === 0 || jx === R - 1 || jy === 0 || jy === C - 1) {
    console.log(jTime + 1);
    return;
  }

  for (const [dx, dy] of directions) {
    const nx = jx + dx;
    const ny = jy + dy;

    if (
      nx >= 0 &&
      nx < R &&
      ny >= 0 &&
      ny < C &&
      maze[nx][ny] === "." &&
      !jihoonVisited[nx][ny] &&
      jTime + 1 < fireTime[nx][ny]
    ) {
      jihoonVisited[nx][ny] = true;
      jihoonQueue.push([nx, ny, jTime + 1]);
    }
  }
}

console.log("IMPOSSIBLE");
