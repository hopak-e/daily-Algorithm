const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const queue = [];
const answer = [];
for (let i = 1; i <= N; i++) {
  const [command, value] = input[i].split(" ");

  switch (command) {
    case "push_front":
      queue.unshift(value);
      break;
    case "push_back":
      queue.push(value);
      break;
    case "pop_front":
      answer.push(queue.shift() || -1);
      break;
    case "pop_back":
      answer.push(queue.pop() || -1);
      break;
    case "size":
      answer.push(queue.length);
      break;
    case "empty":
      answer.push(queue.length ? 0 : 1);
      break;
    case "front":
      answer.push(queue[0] || -1);
      break;
    case "back":
      answer.push(queue[queue.length - 1] || -1);
    default:
      break;
  }
}

console.log(answer.join("\n"));