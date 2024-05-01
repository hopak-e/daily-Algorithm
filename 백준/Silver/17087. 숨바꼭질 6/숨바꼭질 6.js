const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

let temp = 0;
function gcd(a, b) {
  while (b !== 0) {
    temp = a % b;
    a = b;
    b = temp;
  }
  return a;
}

const [N, S] = input[0].split(" ").map(Number);
const location = input[1]
  .split(" ")
  .map(Number)
  .map((v) => Math.abs(S - v));

if (N === 1) console.log(location[0]);
else {
  let result = gcd(location[0], location[1]);
  for (let i = 1; i < location.length; i++) {
    result = gcd(result, location[i]);
  }
  console.log(result);
}
