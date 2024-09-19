let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [n, m] = input[0].split(" ").map(Number);
const paper = input.slice(1).map((line) => line.split(" ").map(Number)); 

const dx = [-1, 1, 0, 0]; 
const dy = [0, 0, -1, 1];
let visited = Array.from({ length: n }, () => Array(m).fill(false)); // 방문 여부 체크

let pictureCount = 0; 
let maxSize = 0; // 가장 넓은 그림의 넓이

// BFS 함수 정의 (DFS로 구현해도 됨)
function bfs(x, y) {
  let queue = [[x, y]];
  visited[x][y] = true;
  let size = 1; // 현재 그림의 넓이

  while (queue.length > 0) {
    let [curX, curY] = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nx = curX + dx[i];
      const ny = curY + dy[i];

      // 도화지 범위를 벗어나지 않고, 방문하지 않은 1인 곳 탐색
      if (
        nx >= 0 &&
        ny >= 0 &&
        nx < n &&
        ny < m &&
        !visited[nx][ny] &&
        paper[nx][ny] === 1
      ) {
        visited[nx][ny] = true;
        queue.push([nx, ny]);
        size++; // 그림 넓이 증가
      }
    }
  }

  return size; // 그림의 넓이 반환
}

// 모든 도화지 칸을 탐색
for (let i = 0; i < n; i++) {
  for (let j = 0; j < m; j++) {
    if (paper[i][j] === 1 && !visited[i][j]) {
      pictureCount++; // 새로운 그림을 찾았으므로 개수 증가
      const size = bfs(i, j); // 그림의 넓이 계산
      maxSize = Math.max(maxSize, size); // 가장 큰 그림의 넓이 갱신
    }
  }
}

// 출력
console.log(pictureCount);
console.log(maxSize);