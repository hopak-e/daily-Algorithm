const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("");

const sticks = [];
let answer = 0;

for (let i = 0; i < input.length; i++) {
  const str = input[i];

  if (str === "(" && input[i + 1] === ")") {
    answer += sticks.length;
    i++;
  } else if (str === "(") {
    sticks.push(str);
  } else if (str === ")") {
    sticks.pop();
    answer++;
  }
}
console.log(answer);