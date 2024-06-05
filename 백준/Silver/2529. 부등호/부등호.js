let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input.shift());
const arr = input[0].split(" ");

function solution() {
  let max = String(Number.MIN_SAFE_INTEGER);
  let min = String(Number.MAX_SAFE_INTEGER);

  const visited = new Array(10).fill(false);

  function dfs(L, prev, result) {
    if (L === N) {
      max = result > max ? result : max;
      min = result > min ? min : result;
      return;
    }
    if (arr[L] === "<") {
      for (let i = prev + 1; i < 10; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        dfs(L + 1, i, result + i);
        visited[i] = false;
      }
    } else {
      for (let i = prev - 1; i > -1; i--) {
        if (visited[i]) continue;
        visited[i] = true;
        dfs(L + 1, i, result + i);
        visited[i] = false;
      }
    }
    return;
  }

  for (let i = 0; i < 10; i++) {
    visited[i] = true;
    dfs(0, i, `${i}`);
    visited[i] = false;
  }

  return `${max}\n${min}`;
}
console.log(solution());
