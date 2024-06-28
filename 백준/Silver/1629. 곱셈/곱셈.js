let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ");

const A = BigInt(input[0]);
const B = BigInt(input[1]);
const C = BigInt(input[2]);

const mod = (a, b, c) => {
  if (b === 0n) return 1n;
  let half = mod(a, b / 2n, c);
  half = (half * half) % c;
  if (b % 2n !== 0n) half = (half * a) % C;
  return half;
};

console.log(mod(A, B, C).toString());
