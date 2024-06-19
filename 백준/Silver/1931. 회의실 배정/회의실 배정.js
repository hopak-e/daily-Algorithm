let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const arr = input.slice(1).map((v) => v.split(" ").map(Number));

arr.sort((a, b) => {
  if (a[1] === b[1]) return a[0] - b[0];
  return a[1] - b[1];
});

let count = 0;
let last = 0;
for (let i = 0; i < N; i++) {
  const [start, end] = arr[i];
  if (start >= last) {
    count++;
    last = end;
  }
}
console.log(count);
