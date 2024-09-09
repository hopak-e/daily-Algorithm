let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const A = input[1].split(" ").map(Number);

const lis = [];

const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return left;
};

for (let i = 0; i < N; i++) {
  const num = A[i];
  const pos = binarySearch(lis, num);

  if (pos >= lis.length) {
    lis.push(num);
  } else {
    lis[pos] = num;
  }
}

console.log(lis.length);
