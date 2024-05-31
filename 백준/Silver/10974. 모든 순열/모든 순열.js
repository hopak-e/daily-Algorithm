let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const N = Number(input[0]);
const visited = new Array({ length: N }).fill(false);
const answer = [];
const tmp = [];
function dfs(len) {
  if (len === N) {
    answer.push(tmp.join(" "));
    return;
  }

  for (let i = 1; i <= N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    tmp.push(i);
    dfs(len + 1);
    tmp.pop();
    visited[i] = false;
  }
}
dfs(0);
console.log(answer.join("\n"));