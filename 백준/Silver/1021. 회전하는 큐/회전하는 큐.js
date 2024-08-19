let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

let deque = Array.from({ length: N }, (_, i) => i + 1);
let count = 0;

for (let ele of arr) {
  let idx = deque.indexOf(ele);

  if (idx <= Math.floor(deque.length / 2)) {
    count += idx;
    while (idx--) {
      deque.push(deque.shift());
    }
  } else {
    count += deque.length - idx;
    while (deque.length - idx++) {
      deque.unshift(deque.pop());
    }
  }

  deque.shift();
}

console.log(count);
