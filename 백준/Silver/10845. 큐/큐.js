const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const answer = [];
const que = [];
for (let i = 1; i <= N; i++) {
  const [command, value] = input[i].split(" ");
  if (command === "push") {
    que.push(value);
  } else if (command === "pop") {
    answer.push(que.shift() || -1);
  } else if (command === "size") {
    answer.push(que.length);
  } else if (command === "empty") {
    answer.push(que.length > 0 ? 0 : 1);
  } else if (command === "front") {
    answer.push(que[0] || -1);
  } else if (command === "back") {
    answer.push(que[que.length - 1] || -1);
  }
}

console.log(answer.join("\n"));