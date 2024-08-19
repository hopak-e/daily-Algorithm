let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input[0]);

for (let i = 1; i <= T; i++) {
  let [x, y] = input[i].split(" ").map(Number);
  let dist = y - x;

  let max = 1;
  let count = 0;
  let total = 0;

  while (dist > total) {
    count++;
    total += max;
    if (count % 2 === 0) {
      max++;
    }
  }

  console.log(count);
}
