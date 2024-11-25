let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

function solve() {
  const [N, M] = input[0].split(" ").map(Number);
  const lab = input.slice(1).map((line) => line.split(" ").map(Number));

  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const virusPositions = [];
  let emptyCount = 0;

  // 바이러스 위치와 빈 칸 개수 파악
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      if (lab[i][j] === 2) {
        virusPositions.push([i, j]);
      } else if (lab[i][j] === 0) {
        emptyCount++;
      }
    }
  }

  if (emptyCount === 0) {
    console.log(0);
    return;
  }

  let minTime = Infinity;

  // 바이러스를 활성화할 M개의 조합 생성
  function combinations(array, size) {
    if (size === 0) return [[]];
    if (array.length === 0) return [];
    const [first, ...rest] = array;
    const withFirst = combinations(rest, size - 1).map((combo) => [
      first,
      ...combo,
    ]);
    const withoutFirst = combinations(rest, size);
    return withFirst.concat(withoutFirst);
  }

  // BFS로 확산 시간 계산
  function bfs(activeVirus) {
    const visited = Array.from({ length: N }, () => Array(N).fill(false));
    const queue = [];
    let infectedCount = 0;
    let time = 0;

    for (const [x, y] of activeVirus) {
      queue.push([x, y, 0]); // x, y, current time
      visited[x][y] = true;
    }

    while (queue.length > 0) {
      const [x, y, currentTime] = queue.shift();

      for (const [dx, dy] of directions) {
        const nx = x + dx;
        const ny = y + dy;

        if (nx >= 0 && nx < N && ny >= 0 && ny < N && !visited[nx][ny]) {
          if (lab[nx][ny] === 0 || lab[nx][ny] === 2) {
            visited[nx][ny] = true;
            queue.push([nx, ny, currentTime + 1]);
            if (lab[nx][ny] === 0) {
              infectedCount++;
              time = currentTime + 1;
            }
          }
        }
      }
    }

    return infectedCount === emptyCount ? time : Infinity;
  }

  // 모든 조합에 대해 최소 시간 계산
  for (const activeVirus of combinations(virusPositions, M)) {
    minTime = Math.min(minTime, bfs(activeVirus));
  }

  console.log(minTime === Infinity ? -1 : minTime);
}

solve();
