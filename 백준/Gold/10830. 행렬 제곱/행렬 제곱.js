let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, B] = input[0].split(" ").map(Number);
const A = input.slice(1).map((v) => v.split(" ").map(Number));

const multiplication = (A, B, size) => {
  const result = Array.from({ length: size }, () => Array(size).fill(0));
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      for (let k = 0; k < size; k++) {
        result[i][j] += A[i][k] * B[k][j];
        result[i][j] %= 1000;
      }
    }
  }
  return result;
};

const makeMatrix = (matrix, count, size) => {
  if (count === 1) {
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        matrix[i][j] %= 1000;
      }
    }
    return matrix;
  }

  const half = makeMatrix(matrix, Math.floor(count / 2), size);
  const halfSquared = multiplication(half, half, size);

  if (count % 2 === 0) {
    return halfSquared;
  } else {
    return multiplication(halfSquared, matrix, size);
  }
};

const answer = makeMatrix(A, B, N);
answer.forEach((row) => console.log(row.join(" ")));

