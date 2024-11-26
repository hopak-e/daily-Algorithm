let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

function solve() {
  const ROWS = 12;
  const COLS = 6;
  const field = input.map((line) => line.split(""));
  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0], // 상하좌우
  ];

  function bfs(x, y, color) {
    const queue = [[x, y]];
    const group = [[x, y]];
    const visited = Array.from({ length: ROWS }, () => Array(COLS).fill(false));
    visited[x][y] = true;

    while (queue.length > 0) {
      const [cx, cy] = queue.shift();

      for (const [dx, dy] of directions) {
        const nx = cx + dx;
        const ny = cy + dy;

        if (
          nx >= 0 &&
          nx < ROWS &&
          ny >= 0 &&
          ny < COLS && // 필드 범위 내
          !visited[nx][ny] &&
          field[nx][ny] === color // 같은 색상 뿌요
        ) {
          visited[nx][ny] = true;
          queue.push([nx, ny]);
          group.push([nx, ny]);
        }
      }
    }

    return group;
  }

  function applyGravity() {
    for (let col = 0; col < COLS; col++) {
      let emptyRow = ROWS - 1;

      for (let row = ROWS - 1; row >= 0; row--) {
        if (field[row][col] !== ".") {
          [field[emptyRow][col], field[row][col]] = [
            field[row][col],
            field[emptyRow][col],
          ];
          emptyRow--;
        }
      }
    }
  }

  let chainCount = 0;

  while (true) {
    const toRemove = [];

    for (let x = 0; x < ROWS; x++) {
      for (let y = 0; y < COLS; y++) {
        if (field[x][y] !== ".") {
          const group = bfs(x, y, field[x][y]);
          if (group.length >= 4) {
            toRemove.push(...group);
          }
        }
      }
    }

    if (toRemove.length === 0) break;

    for (const [x, y] of toRemove) {
      field[x][y] = ".";
    }

    applyGravity();
    chainCount++;
  }

  console.log(chainCount);
}

solve();
