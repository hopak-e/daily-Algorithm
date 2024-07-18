let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();
// .split("\n");

const n = BigInt(input);
const mod = 1000000007n;

const multiMatrix = (a, b) => {
  return [
    [
      (a[0][0] * b[0][0] + a[0][1] * b[1][0]) % mod,
      (a[0][0] * b[0][1] + a[0][1] * b[1][1]) % mod,
    ],
    [
      (a[1][0] * b[0][0] + a[1][1] * b[1][0]) % mod,
      (a[1][0] * b[0][1] + a[1][1] * b[1][1]) % mod,
    ],
  ];
};

const makeMatrix = (matrix, power) => {
  let result = [
    [1n, 0n],
    [0n, 1n],
  ];
  let base = matrix;

  while (power > 0n) {
    if (power % 2n === 1n) {
      result = multiMatrix(result, base);
    }
    base = multiMatrix(base, base);
    power = power / 2n;
  }
  return result;
};

const fibonacci = () => {
  if (n === 0n) return 0n;
  if (n === 1n) return 1n;

  const F = [
    [1n, 1n],
    [1n, 0n],
  ];
  const result = makeMatrix(F, n - 1n);
  return result[0][0];
};

console.log((fibonacci() % mod).toString());
