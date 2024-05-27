let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const candy = input.slice(1).map((v) => v.split(""));

const getMax = () => {
  let max = 0;
  for (let i = 0; i < N; i++) {
    let count = 1;
    for (let j = 1; j < N; j++) {
      if (candy[i][j] === candy[i][j - 1]) {
        count++;
      } else {
        max = Math.max(count, max);
        count = 1;
      }
    }
    max = Math.max(max, count);
  }

  for (let i = 0; i < N; i++) {
    let count = 1;
    for (let j = 1; j < N; j++) {
      if (candy[j][i] === candy[j - 1][i]) {
        count++;
      } else {
        max = Math.max(count, max);
        count = 1;
      }
    }
    max = Math.max(count, max);
  }
  return max;
};
let changeMax = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (j + 1 < N) {
      [candy[i][j], candy[i][j + 1]] = [candy[i][j + 1], candy[i][j]];
      changeMax = Math.max(getMax(candy), changeMax);
      [candy[i][j], candy[i][j + 1]] = [candy[i][j + 1], candy[i][j]];
    }
    if (i + 1 < N) {
      [candy[i][j], candy[i + 1][j]] = [candy[i + 1][j], candy[i][j]];
      changeMax = Math.max(getMax(candy), changeMax);
      [candy[i][j], candy[i + 1][j]] = [candy[i + 1][j], candy[i][j]];
    }
  }
}
console.log(changeMax);
