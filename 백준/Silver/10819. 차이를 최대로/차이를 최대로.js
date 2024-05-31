let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

function solution() {
  let max = 0;
  const tmp = [];
  const visited = new Array({ length: N }).fill(false);

  function dfs() {
    if (tmp.length === N) {
      let sum = 0;
      for (let i = 0; i < N - 1; i++) {
        sum += Math.abs(tmp[i] - tmp[i + 1]);
      }
      if (max < sum) {
        max = sum;
      }
    } else {
      for (let i = 0; i < N; i++) {
        if (visited[i]) continue;
        visited[i] = true;
        tmp.push(arr[i]);
        dfs();
        tmp.pop();
        visited[i] = false;
      }
    }
  }
  dfs();
  console.log(max);
}

solution();
