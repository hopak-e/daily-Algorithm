let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input[1].trim();

const matrix = Array.from({ length: N }, () => Array(N).fill(""));

let idx = 0;
for (let i = 0; i < N; i++) {
  for (let j = i; j < N; j++) {
    matrix[i][j] = arr[idx++];
  }
}

const answer = Array(N).fill(0);

function solution(i) {
  if (i === N) return true;

  for (let x = -10; x <= 10; x++) {
    answer[i] = x;
    let valid = true;
    let sum = 0;

    for (let j = i; j >= 0; j--) {
      sum += answer[j];
      if (
        (sum > 0 && matrix[j][i] !== "+") ||
        (sum < 0 && matrix[j][i] !== "-") ||
        (sum === 0 && matrix[j][i] !== "0")
      ) {
        valid = false;
        break;
      }
    }
    if (valid && solution(i + 1)) {
      return true;
    }
  }
  return false;
}
solution(0);
console.log(answer.join(" "));
