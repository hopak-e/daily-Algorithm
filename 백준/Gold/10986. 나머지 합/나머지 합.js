let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const numbers = input[1].split(" ").map(Number);

const modCount = Array(M).fill(0);
let prefixSum = 0;
let count = 0;

// 첫 번째 경우: 나머지가 0인 구간은 그 자체로 나누어떨어짐
modCount[0] = 1;

for (let i = 0; i < N; i++) {
  // 누적합 계산
  prefixSum += numbers[i];

  // 누적합을 M으로 나눈 나머지 계산
  const mod = ((prefixSum % M) + M) % M;

  // 나머지가 같은 구간을 찾으면 해당 구간이 나누어떨어짐
  count += modCount[mod];

  // 현재 나머지 값을 카운팅
  modCount[mod]++;
}

console.log(count);
