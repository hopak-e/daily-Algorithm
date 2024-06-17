let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const [N, r, c] = input.split(" ").map(Number);

const size = Math.pow(2, N);

const order = (size, row, col) => {
  if (size === 1) return 0;
  const half = size / 2;

  if (row < half && col < half) {
    return order(half, row, col);
  } else if (row < half && col >= half) {
    return half * half + order(half, row, col - half);
  } else if (row >= half && col < half) {
    return 2 * half * half + order(half, row - half, col);
  } else {
    return 3 * half * half + order(half, row - half, col - half);
  }
};

console.log(order(size, r, c));
