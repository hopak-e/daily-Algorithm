let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const stack = [];
let result = 0;
let temp = 1;
function solution(txt) {
  for (let i = 0; i < txt.length; i++) {
    const char = txt[i];
    if (char === "(") {
      stack.push(char);
      temp *= 2;
    } else if (char === "[") {
      stack.push(char);
      temp *= 3;
    } else if (char === ")") {
      if (!stack.length || stack[stack.length - 1] !== "(") return 0;
      if (txt[i - 1] === "(") result += temp;
      stack.pop();
      temp /= 2;
    } else if (char === "]") {
      if (!stack.length || stack[stack.length - 1] !== "[") return 0;
      if (txt[i - 1] === "[") result += temp;
      stack.pop();
      temp /= 3;
    }
  }
  return stack.length ? 0 : result;
}
console.log(solution(input));
