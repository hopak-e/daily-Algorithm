let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);

const sortedArr = [...arr].sort((a, b) => a - b);

let count = 0;
let map = new Map();
for (let i = 0; i < N; i++) {
  if (!map.has(sortedArr[i])) {
    map.set(sortedArr[i], count++);
  }
}

const answer = arr.map((el) => map.get(el));
console.log(answer.join(" "));

