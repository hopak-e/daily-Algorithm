let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const pattern = (n) => {
  if (n === 1) {
    return ["*"];
  }

  const sub = pattern(n / 3);
  const arr = [];

  for (let i = 0; i < n; i++) {
    if (Math.floor(i / (n / 3)) === 1) {
      arr.push(sub[i % (n / 3)] + " ".repeat(n / 3) + sub[i % (n / 3)]);
    } else {
      arr.push(sub[i % (n / 3)].repeat(3));
    }
  }
  return arr;
};

const answer = pattern(N);
console.log(answer.join("\n"));
