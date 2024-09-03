let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const arr = input.slice(0, 4).map((v) => v.split("").map(Number));
const K = Number(input[4]);

const rotations = input.slice(5).map((v) => v.split(" ").map(Number));

const rotate = (el) => {
  el.unshift(el.pop());
};

const reverseRotate = (el) => {
  el.push(el.shift());
};

const solution = (idx, dir) => {
  const directions = Array(4).fill(0);
  directions[idx] = dir;

  for (let i = idx; i > 0; i--) {
    if (arr[i][6] !== arr[i - 1][2]) {
      directions[i - 1] = -directions[i];
    } else {
      break;
    }
  }

  for (let i = idx; i < 3; i++) {
    if (arr[i][2] !== arr[i + 1][6]) {
      directions[i + 1] = -directions[i];
    } else {
      break;
    }
  }

  for (let i = 0; i < 4; i++) {
    if (directions[i] === 1) {
      rotate(arr[i]);
    } else if (directions[i] === -1) {
      reverseRotate(arr[i]);
    }
  }
};

for (const [idx, dir] of rotations) {
  solution(idx - 1, dir);
}

let score = 0;
if (arr[0][0] === 1) score += 1;
if (arr[1][0] === 1) score += 2;
if (arr[2][0] === 1) score += 4;
if (arr[3][0] === 1) score += 8;

console.log(score);
