let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input.shift());
const arr = input.map((v) => v.split(" ").map(Number));

function solution() {
  const tmp = [];
  const answer = [];
  const visited = new Array({ length: N }).fill(false);

  function dfs(depth) {
    if (depth === N) {
      let result = 0;
      for (let i = 0; i < N; i++) {
        let start = tmp[i];
        let end = tmp[i + 1];

        if (end === undefined) {
          end = tmp[0];
        }
        if (arr[start][end] !== 0) {
          result += arr[start][end];
        } else return;
      }
      answer.push(result);
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visited[i]) continue;
      visited[i] = true;
      tmp.push(i);
      dfs(depth + 1);
      tmp.pop();
      visited[i] = false;
    }
  }
  dfs(0);
  console.log(Math.min(...answer));
}

solution();