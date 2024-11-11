let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

function solution(arr) {
  let area = 0;
  for (let i = 0; i < N; i++) {
    const [x1, y1] = arr[i];
    const [x2, y2] = arr[(i + 1) % N];
    area += x1 * y2 - y1 * x2;
  }

  return Math.abs(area) / 2;
}

const area = solution(arr);
console.log(area.toFixed(1));
