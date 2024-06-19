let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const getAmount = (height) => {
  let total = 0;
  for (let i = 0; i < N; i++) {
    if (arr[i] > height) {
      total += arr[i] - height;
    }
  }
  return total;
};

let low = 0;
let high = Math.max(...arr);
let result = 0;

while (low <= high) {
  const mid = Math.floor((low + high) / 2);
  const wood = getAmount(mid);
  if (wood >= M) {
    result = mid;
    low = mid + 1;
  } else {
    high = mid - 1;
  }
}

console.log(result);
