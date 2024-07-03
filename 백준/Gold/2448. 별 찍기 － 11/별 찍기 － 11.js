let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const result = Array.from({ length: N }, () => Array(2 * N).fill(" "));

function solution(y, x, size) {
  if (size === 3) {
    result[y][x] = "*";
    result[y + 1][x - 1] = "*";
    result[y + 1][x + 1] = "*";
    result[y + 2][x - 2] = "*";
    result[y + 2][x - 1] = "*";
    result[y + 2][x] = "*";
    result[y + 2][x + 1] = "*";
    result[y + 2][x + 2] = "*";
  } else {
    const newSize = size / 2;
    solution(y, x, newSize);
    solution(y + newSize, x - newSize, newSize);
    solution(y + newSize, x + newSize, newSize);
  }
}

solution(0, N - 1, N);

let answer = "";
for (let row of result) {
  answer += row.join("") + "\n";
}

console.log(answer);
