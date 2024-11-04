let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split(" ");

const min = BigInt(input[0]);
const max = BigInt(input[1]);

// 범위 내의 모든 수를 제곱ㄴㄴ수로 가정하고 시작
const size = Number(max - min + 1n);
const isSquareFree = Array(size).fill(true);

for (let i = 2n; i * i <= max; i++) {
  const square = i * i;

  let start = min % square === 0n ? min : min + (square - (min % square));

  // 해당 제곱수로 나누어 떨어지는 수를 모두 제거
  for (let j = start; j <= max; j += square) {
    isSquareFree[Number(j - min)] = false;
  }
}

// true로 남아 있는 수의 개수를 세어 출력
const result = isSquareFree.filter(Boolean).length;
console.log(result);
