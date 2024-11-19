let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

function solve(input) {
  const T = Number(input[0]);
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];
  let idx = 1;

  const results = [];

  for (let t = 0; t < T; t++) {
    const [w, h] = input[idx++].split(" ").map(Number);
    const building = [];
    const fireQueue = [];
    let sangQueue = [];
    let sangVisited = Array.from({ length: h }, () => Array(w).fill(false));
    let fireTime = Array.from({ length: h }, () => Array(w).fill(Infinity));

    for (let i = 0; i < h; i++) {
      building[i] = input[idx++];
      for (let j = 0; j < w; j++) {
        if (building[i][j] === "@") {
          sangQueue.push([i, j, 0]);
          sangVisited[i][j] = true;
        } else if (building[i][j] === "*") {
          fireQueue.push([i, j, 0]);
          fireTime[i][j] = 0;
        }
      }
    }

    let fireHead = 0;
    while (fireHead < fireQueue.length) {
      const [x, y, time] = fireQueue[fireHead++];

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < h &&
          ny >= 0 &&
          ny < w &&
          building[nx][ny] === "." &&
          fireTime[nx][ny] > time + 1
        ) {
          fireTime[nx][ny] = time + 1;
          fireQueue.push([nx, ny, time + 1]);
        }
      }
    }

    // 상근이 이동 BFS
    let escaped = false;
    let sangHead = 0;
    while (sangHead < sangQueue.length) {
      const [x, y, time] = sangQueue[sangHead++];

      // 탈출 조건: 경계에 도달
      if (x === 0 || x === h - 1 || y === 0 || y === w - 1) {
        results.push(time + 1);
        escaped = true;
        break;
      }

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (
          nx >= 0 &&
          nx < h &&
          ny >= 0 &&
          ny < w &&
          building[nx][ny] === "." &&
          !sangVisited[nx][ny] &&
          fireTime[nx][ny] > time + 1
        ) {
          sangVisited[nx][ny] = true;
          sangQueue.push([nx, ny, time + 1]);
        }
      }
    }

    if (!escaped) results.push("IMPOSSIBLE");
  }

  console.log(results.join("\n"));
}

solve(input);
