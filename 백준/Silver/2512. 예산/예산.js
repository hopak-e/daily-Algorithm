let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const M = Number(input[2]);

const solution = () => {
  let low = 0;
  let high = Math.max(...arr);
  let result = 0;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);

    const total = arr.reduce((acc, cur) => {
      return acc + Math.min(cur, mid);
    }, 0);

    if (total <= M) {
      result = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return result;
};

console.log(solution());
