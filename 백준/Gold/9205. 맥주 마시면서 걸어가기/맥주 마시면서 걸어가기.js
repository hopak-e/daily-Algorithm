let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = parseInt(input[0], 10);
let idx = 1;

const canReach = (start, end) => {
  const [x1, y1] = start;
  const [x2, y2] = end;
  return Math.abs(x1 - x2) + Math.abs(y1 - y2) <= 1000;
};

const bfs = (home, stores, festival) => {
  const queue = [home];
  const visited = new Array(stores.length).fill(false);

  while (queue.length > 0) {
    const [x, y] = queue.shift();

    // 페스티벌 위치에 도착할 수 있으면 "happy" 반환
    if (canReach([x, y], festival)) return "happy";

    // 각 편의점 위치를 탐색
    for (let i = 0; i < stores.length; i++) {
      if (!visited[i] && canReach([x, y], stores[i])) {
        visited[i] = true;
        queue.push(stores[i]);
      }
    }
  }
  // 페스티벌에 도착할 수 없으면 "sad" 반환
  return "sad";
};

const results = [];

for (let t = 0; t < T; t++) {
  const n = parseInt(input[idx], 10);
  const home = input[idx + 1].split(" ").map(Number);
  const stores = [];
  for (let i = 0; i < n; i++) {
    stores.push(input[idx + 2 + i].split(" ").map(Number));
  }
  const festival = input[idx + 2 + n].split(" ").map(Number);
  idx += n + 3;

  results.push(bfs(home, stores, festival));
}

console.log(results.join("\n"));
