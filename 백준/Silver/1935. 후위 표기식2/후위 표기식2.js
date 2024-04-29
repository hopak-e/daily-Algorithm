const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(input.shift());
const exp = input.shift();
const stack = [];
const map = new Map();

for (let i = 0; i < exp.length; i++) {
  let cur = exp[i];
  if (cur.charCodeAt(0) >= 65 && cur.charCodeAt(0) <= 90) {
    if (!map.has(cur)) {
      map.set(cur, input.shift());
    }
    stack.push(map.get(cur));
  } else {
    let num2 = Number(stack.pop());
    let num1 = Number(stack.pop());

    let result = 0;
    switch (cur) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
    }
    stack.push(result);
  }
}

console.log(stack[0].toFixed(2));