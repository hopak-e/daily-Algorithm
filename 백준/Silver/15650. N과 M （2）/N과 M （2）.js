let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const [N, M] = input;
const arr = Array(M).fill("");
const visited = Array(N + 1).fill(false);

function dfs(cnt, start) {
  if (cnt === M) {
    console.log(arr.join(" "));
    return;
  }

  for (let i = start; i <= N; i++) {
    if (visited[i]) continue;
    arr[cnt] = i;
    visited[i] = true;
    dfs(cnt + 1, i);
    visited[i] = false;
  }
}

dfs(0, 1);