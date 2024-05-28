let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));
const [T, ...nums] = input;

const answer = [];

const gcd = (a, b) => {
  let x = Math.max(a, b);
  let y = Math.min(a, b);
  let r;
  while (y) {
    r = x % y;
    x = y;
    y = r;
  }
  return x;
};

const findYear = (M, N, x, y) => {
  let k = x;
  const lcm = (M * N) / gcd(M, N);
  while (k <= lcm) {
    if (((k - 1) % N) + 1 === y) {
      return k;
    }
    k += M;
  }
  return -1;
};

for (let i = 0; i < T; i++) {
  const [M, N, x, y] = nums[i];
  answer.push(findYear(M, N, x, y));
}
console.log(answer.join("\n"));