const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ");

const N = Number(input[0]);
const answer = [];
const que = Array.from({ length: N }, (v, i) => (v = ++i));
let cnt = 1;
while (que.length > 0) {
  const shift = que.shift();
  if (cnt % input[1] === 0) answer.push(shift);
  else que.push(shift);
  cnt++;
}

console.log("<" + answer.join(", ") + ">");