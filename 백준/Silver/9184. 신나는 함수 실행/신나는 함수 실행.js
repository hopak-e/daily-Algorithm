let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = input.length;

const memo = Array.from({ length: 21 }, () =>
  Array.from({ length: 21 }, () => Array(21).fill(undefined))
);

const w = (a, b, c) => {
  if (a <= 0 || b <= 0 || c <= 0) return 1;
  if (a > 20 || b > 20 || c > 20) return w(20, 20, 20);

  if (memo[a][b][c] !== undefined) return memo[a][b][c];

  if (a < b && b < c) {
    memo[a][b][c] = w(a, b, c - 1) + w(a, b - 1, c - 1) - w(a, b - 1, c);
  } else {
    memo[a][b][c] =
      w(a - 1, b, c) +
      w(a - 1, b - 1, c) +
      w(a - 1, b, c - 1) -
      w(a - 1, b - 1, c - 1);
  }

  return memo[a][b][c];
};

let result = "";

for (let i = 0; i < N - 1; i++) {
  const [a, b, c] = input[i].split(" ").map(Number);
  if (a === -1 && b === -1 && c === -1) break;
  result += `w(${a}, ${b}, ${c}) = ${w(a, b, c)}\n`;
}

console.log(result.trim());
