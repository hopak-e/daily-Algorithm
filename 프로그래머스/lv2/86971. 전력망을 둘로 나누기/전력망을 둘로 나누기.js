function solution(n, wires) {
  var answer = 1000;
  let visited = Array.from({ length: n + 1 }, () => 0);
  let count = 1;
  let graph = Array.from(Array(n + 1), () => Array.from(n + 1).fill(0));
  for (let [a, b] of wires) {
    graph[a][b] = 1;
    graph[b][a] = 1;
  }

  const dfs = (num) => {
    for (let i = 1; i <= n; i++) {
      if (visited[i] === 0 && graph[num][i] === 1) {
        visited[num] = 1;
        count++;
        dfs(i);
        visited[num] = 0;
      }
    }
  };

  for (let [a, b] of wires) {
    graph[a][b] = 0;
    graph[b][a] = 0;
    count = 1;
    dfs(1);
    graph[a][b] = 1;
    graph[b][a] = 1;
    answer = Math.min(answer, Math.abs(n - count - count));
  }
  return answer;
}