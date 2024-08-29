let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, S] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);

const solution = () => {
  let start = 0;
  let end = 0;
  let sum = 0;
  let min = Infinity;

  while (end < N) {
    sum += arr[end];
    end++;

    while (sum >= S) {
      min = Math.min(min, end - start);
      sum -= arr[start];
      start++;
    }
  }

  return min === Infinity ? 0 : min;
};

console.log(solution());
