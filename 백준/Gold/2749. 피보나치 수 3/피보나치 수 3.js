let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();
// .split("\n");

const num = BigInt(input);
const MOD = 1000000n;

// 행렬 곱셈 함수
function multiplyMatrix(A, B) {
  return [
    [
      (A[0][0] * B[0][0] + A[0][1] * B[1][0]) % MOD,
      (A[0][0] * B[0][1] + A[0][1] * B[1][1]) % MOD,
    ],
    [
      (A[1][0] * B[0][0] + A[1][1] * B[1][0]) % MOD,
      (A[1][0] * B[0][1] + A[1][1] * B[1][1]) % MOD,
    ],
  ];
}

// 행렬 거듭제곱 함수
function matrixPower(matrix, n) {
  let result = [
    [1n, 0n],
    [0n, 1n],
  ]; // 단위 행렬

  while (n > 0n) {
    if (n % 2n === 1n) {
      result = multiplyMatrix(result, matrix);
    }
    matrix = multiplyMatrix(matrix, matrix);
    n = n / 2n;
  }

  return result;
}

// 피보나치 수 계산 함수
function fibonacci(n) {
  if (n === 0n) return 0;
  if (n === 1n) return 1;

  const fibMatrix = [
    [1n, 1n],
    [1n, 0n],
  ];
  const resultMatrix = matrixPower(fibMatrix, n - 1n);

  return Number(resultMatrix[0][0] % MOD);
}

console.log(fibonacci(num));
