let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const L = Number(input[0]);
const str = input[1];
const r = BigInt(31);
const M = BigInt(1234567891);

let hash = BigInt(0);

for (let i = 0; i < L; i++) {
  const charValue = BigInt(str.charCodeAt(i) - "a".charCodeAt(0) + 1);
  hash = (hash + charValue * r ** BigInt(i)) % M;
}

console.log(Number(hash));
