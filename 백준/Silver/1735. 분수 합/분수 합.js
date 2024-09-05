let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [A, B] = input[0].split(" ").map(Number);
const [C, D] = input[1].split(" ").map(Number);

const head = A * D + B * C;
const bottom = B * D;

const gcd = (x, y) => {
  while (y !== 0) {
    let temp = y;
    y = x % y;
    x = temp;
  }
  return x;
};

const newHead = head / gcd(head, bottom);
const newBottom = bottom / gcd(head, bottom);

console.log(`${newHead} ${newBottom}`);
