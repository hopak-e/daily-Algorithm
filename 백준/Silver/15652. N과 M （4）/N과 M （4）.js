let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const [N, M] = input;
const arr = Array(M).fill("");
let answer = "";

function dfs(depth, start) {
  if (depth === M) {
    answer += `${arr.join(" ")}\n`;
    return;
  }

  for (let i = start; i <= N; i++) {
    arr[depth] = i;
    start = i;
    dfs(depth + 1, start);
  }
}
dfs(0, 1);
console.log(answer.trim());
