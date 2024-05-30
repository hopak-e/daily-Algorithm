let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [N, M] = input[0];
const arr = input[1].sort((a, b) => a - b);
const visited = new Array({ length: N }).fill(false);
let answer = "";
const tmp = [];
function dfs(len, start) {
  if (len === M) {
    answer += `${tmp.join(" ")}\n`;
    return;
  }

  for (let i = start; i < N; i++) {
    if (visited[i]) continue;
    visited[i] = true;
    tmp.push(arr[i]);
    dfs(len + 1, i + 1);
    tmp.pop(arr[i]);
    visited[i] = false;
  }
}
dfs(0, 0);
console.log(answer.trim());
