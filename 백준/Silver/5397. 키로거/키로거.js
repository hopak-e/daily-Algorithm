let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = parseInt(input[0]);
const results = [];

for (let i = 1; i <= T; i++) {
  const commands = input[i];
  const leftStack = [];
  const rightStack = [];

  for (const command of commands) {
    if (command === "-") {
      if (leftStack.length > 0) leftStack.pop();
    } else if (command === "<") {
      if (leftStack.length > 0) rightStack.push(leftStack.pop());
    } else if (command === ">") {
      if (rightStack.length > 0) leftStack.push(rightStack.pop());
    } else {
      leftStack.push(command);
    }
  }

  results.push(leftStack.join("") + rightStack.reverse().join(""));
}

console.log(results.join("\n"));
