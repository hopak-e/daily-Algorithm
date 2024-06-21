let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input[0]);
const commands = ["D", "S", "L", "R"];

const getNext = (num, command) => {
  if (command === "D") {
    return (num * 2) % 10000;
  } else if (command === "S") {
    return num === 0 ? 9999 : num - 1;
  } else if (command === "L") {
    return (num % 1000) * 10 + Math.floor(num / 1000);
  } else if (command === "R") {
    return Math.floor(num / 10) + (num % 10) * 1000;
  }
};

const bfs = (start, end) => {
  const queue = [[start, ""]];
  const visited = Array(10000).fill(false);
  visited[start];

  let front = 0;
  while (front < queue.length) {
    const [current, path] = queue[front++];

    if (current === end) {
      return path;
    }

    for (const command of commands) {
      const next = getNext(current, command);

      if (!visited[next]) {
        visited[next] = true;
        queue.push([next, path + command]);
      }
    }
  }
};

const answer = [];
for (let i = 1; i <= T; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  answer.push(bfs(a, b));
}

console.log(answer.join("\n"));
