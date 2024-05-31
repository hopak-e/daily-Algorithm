let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const [N, M] = input[0];
const arr = input[1].sort((a, b) => a - b);
const visited = new Array({ length: N }).fill(false);
let answer = [];
const tmp = [];
function dfs(len) {
  if (len === M) {
    answer.push(tmp.join(" "));
    return;
  }

  for (let i = 0; i < N; i++) {
    tmp.push(arr[i]);
    dfs(len + 1);
    tmp.pop(arr[i]);
  }
}
dfs(0);
console.log([...new Set(answer)].join("\n"));
