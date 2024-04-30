const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .split("\n");

const N = input.length;
const answer = [];
for (let i = 0; i < N; i++) {
  if (input[i] === "") continue;
  const strArr = [0, 0, 0, 0];
  for (let str of input[i]) {
    if (/[a-z]/.test(str)) strArr[0]++;
    if (/[A-Z]/.test(str)) strArr[1]++;
    if (/[0-9]/.test(str)) strArr[2]++;
    if (/[ ]/.test(str)) strArr[3]++;
  }
  answer.push(strArr.join(" "));
}

console.log(answer.join("\n"));
