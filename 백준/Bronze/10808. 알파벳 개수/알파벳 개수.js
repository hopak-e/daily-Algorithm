const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const N = input.length;
const alphabet = "abcdefghijklmnopqrstuvwxyz";
const answer = Array.from({ length: 26 }).fill(0);

for (let i = 0; i < N; i++) {
  answer[alphabet.indexOf(input[i])]++;
}

console.log(answer.join(" "));