let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const n = Number(input[0]);
const arr = input[1].split(" ").map(Number);
const x = Number(input[2]);

const solution = () => {
  const seen = new Set();
  let count = 0;

  for (let num of arr) {
    let complement = x - num;
    if (seen.has(complement)) {
      count++;
    }
    seen.add(num);
  }
  return count;
};

console.log(solution());
