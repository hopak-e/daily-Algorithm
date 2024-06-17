let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
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
    arr[stack.pop()] = arr[i];
  }
  stack.push(i);
}

while (stack.length) {
  arr[stack.pop()] = -1;
}
console.log(arr.join(" "));
