let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const m = Number(input[1]);

const INF = 10000000;
let graph = Array.from({ length: n }, () => Array(n).fill(INF));
for (let i = 0; i < n; i++) {
  graph[i][i] = 0;
}
for (let i = 2; i < m + 2; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  if (graph[a - 1][b - 1] > c) {
    graph[a - 1][b - 1] = c;
  }
}

for (let k = 0; k < n; k++) {
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (graph[i][j] > graph[i][k] + graph[k][j]) {
        graph[i][j] = graph[i][k] + graph[k][j];
      }
    }
  }
}
for (let i = 0; i < n; i++) {
  let result = "";
  for (let j = 0; j < n; j++) {
    if (graph[i][j] === INF) {
      result += "0 ";
    } else {
      result += `${graph[i][j]} `;
    }
  }
  console.log(result.trim());
}
