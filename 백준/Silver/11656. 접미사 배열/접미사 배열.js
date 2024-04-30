const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const N = input.length;
let answer = [input];
let str = input;
for (let i = 0; i < N; i++) {
  str = str.slice(1);
  if (str !== "") answer.push(str);
}
answer.sort();
console.log(answer.join("\n"));
