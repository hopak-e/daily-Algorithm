const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const answer = Array(N).fill(-1);
const stack = [];
const map = {};

for (let i = 0; i < N; i++) {
  if (map[arr[i]]) {
    map[arr[i]]++;
  } else {
    map[arr[i]] = 1;
  }
}

for (let i = 0; i < N; i++) {
  while (stack.length > 0 && map[arr[stack[stack.length - 1]]] < map[arr[i]]) {
    answer[stack.pop()] = arr[i];
  }

  stack.push(i);
}

console.log(answer.join(" ").trim());