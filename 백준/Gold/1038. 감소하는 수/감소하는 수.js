let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input);
function findNthDescendingNumber(N) {
  const results = [];

  function generateDescendingNumbers(current, lastDigit) {
    // 현재 수가 감소하는 수, 마지막 자리보다 작은 숫자를 추가
    results.push(Number(current));
    for (let next = lastDigit - 1; next >= 0; next--) {
      generateDescendingNumbers(current + next, next);
    }
  }

  // 0 ~ 9부터 시작해 모든 감소하는 수 생성
  for (let start = 0; start <= 9; start++) {
    generateDescendingNumbers(String(start), start);
  }

  // 모든 감소하는 수를 정렬
  results.sort((a, b) => a - b);

  // N번째 감소하는 수 반환
  return results[N] !== undefined ? results[N] : -1;
}

console.log(findNthDescendingNumber(N));
