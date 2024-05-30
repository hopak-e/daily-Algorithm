let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

const [N, M] = input;
const arr = Array(M).fill("");
let answer = "";

function dfs(depth) {
  if (depth === M) {
    answer += `${arr.join(" ")}\n`;
    return;
  }

  for (let i = 1; i <= N; i++) {
    arr[depth] = i;
    dfs(depth + 1);
  }
}
dfs(0);
console.log(answer);
