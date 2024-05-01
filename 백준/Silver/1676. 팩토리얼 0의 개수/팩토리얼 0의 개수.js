const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);
if (input === 0) return 1;
let answer = 0;
for (let i = 1; i <= input; i++) {
  if (i % 5 === 0) answer++;
  if (i % 25 === 0) answer++;
  if (i % 125 === 0) answer++;
}

console.log(answer);
