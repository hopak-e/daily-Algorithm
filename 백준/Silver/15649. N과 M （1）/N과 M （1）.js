let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ")
  .map(Number);

function solution(input) {
  const [N, M] = input;
  let answer = "";
  const arr = [];
  const visited = new Array(N).fill(false);

  function dfs(count) {
    if (count === M) {
      answer += `${arr.join(" ")}\n`;
      return;
    }

    for (let i = 0; i < N; i++) {
      if (visited[i] === true) continue;
      visited[i] = true;
      arr.push(i + 1);
      dfs(count + 1);
      arr.pop();
      visited[i] = false;
    }
  }
  dfs(0);
  return answer;
}

console.log(solution(input));