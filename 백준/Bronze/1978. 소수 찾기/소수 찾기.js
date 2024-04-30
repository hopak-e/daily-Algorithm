const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().split('\n');
const N = Number(input.shift());

// 소수 판별 함수
function isPrime(n) {
  if (n === 2 || n === 3) {
    return true;
  }

  if (n <= 1 || n % 2 === 0) {
    return false;
  }

  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

const numbers = input[0].split(' ').map(n => Number(n));
let count = 0;
for (let i = 0; i < N; i++) {
  if (isPrime(numbers[i])) {
    count += 1;
  }
}

console.log(count);