let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, sum] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let count = sum === 0 ? -1 : 0;

function dfs(start, tmp) {
  if (tmp === sum) {
    count++;
  }
  for (let i = start; i < N; i++) {
    dfs(i + 1, tmp + arr[i]);
  }
}
dfs(0, 0);
console.log(count);
