let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();
// .split("\n");

const map = new Set();
const n = input.length;

for (let i = 0; i < n; i++) {
  let str = "";
  for (let j = i; j < n; j++) {
    str += input[j];
    map.add(str);
  }
}

console.log(map.size);
