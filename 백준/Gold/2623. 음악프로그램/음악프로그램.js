let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
function solve(input) {
  const [N, M] = input[0].split(" ").map(Number);
  const indegree = Array(N + 1).fill(0);
  const graph = Array.from({ length: N + 1 }, () => []);

  // 그래프 구성
  for (let i = 1; i <= M; i++) {
    const [count, ...order] = input[i].split(" ").map(Number);
    for (let j = 0; j < count - 1; j++) {
      const from = order[j];
      const to = order[j + 1];
      graph[from].push(to);
      indegree[to]++;
    }
  }

  // 위상 정렬
  const queue = [];
  const result = [];

  for (let i = 1; i <= N; i++) {
    if (indegree[i] === 0) queue.push(i);
  }

  while (queue.length > 0) {
    const current = queue.shift();
    result.push(current);

    for (const next of graph[current]) {
      indegree[next]--;
      if (indegree[next] === 0) queue.push(next);
    }
  }

  // 결과 출력
  if (result.length !== N) {
    console.log(0); // 사이클 존재
  } else {
    console.log(result.join("\n"));
  }
}

solve(input);
