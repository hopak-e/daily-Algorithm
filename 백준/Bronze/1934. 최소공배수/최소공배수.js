const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input.shift());
const answer = [];

const gcd = (a, b) => {
  if (b === 0) {
    return a;
  } else {
    return gcd(b, a % b);
  }
};

const lcm = (a, b) => {
  return (a * b) / gcd(a, b);
};

for (let i = 0; i < N; i++) {
  const [left, right] = input[i].split(" ").map(Number);
  answer.push(lcm(left, right));
}
console.log(answer.join("\n"));
