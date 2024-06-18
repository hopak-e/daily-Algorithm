let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const calGCD = (a, b) => {
  if (b === 0) {
    return a;
  }
  return calGCD(b, a % b);
};
const answer = [];
for (let i = 1; i <= N; i++) {
  const [a, b] = input[i].split(" ").map(Number);
  const gcd = calGCD(a, b);
  const lcd = (a * b) / gcd;
  answer.push(lcd);
}

console.log(answer.join("\n"));
