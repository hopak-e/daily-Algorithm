let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split("").map(Number));

const SIZE = 9;
const EMPTY = 0;

const blanks = [];
for (let i = 0; i < SIZE; i++) {
  for (let j = 0; j < SIZE; j++) {
    if (input[i][j] === EMPTY) {
      blanks.push([i, j]);
    }
  }
}

function isValid(x, y, num) {
  for (let i = 0; i < SIZE; i++) {
    if (input[x][i] === num || input[i][y] === num) return false;
  }

  const startX = Math.floor(x / 3) * 3;
  const startY = Math.floor(y / 3) * 3;
  for (let i = startX; i < startX + 3; i++) {
    for (let j = startY; j < startY + 3; j++) {
      if (input[i][j] === num) return false;
    }
  }

  return true;
}

function solve(index) {
  if (index === blanks.length) {
    console.log(input.map((row) => row.join("")).join("\n"));
    process.exit(0);
  }

  const [x, y] = blanks[index];

  for (let num = 1; num <= SIZE; num++) {
    if (isValid(x, y, num)) {
      input[x][y] = num;
      solve(index + 1);
      input[x][y] = EMPTY;
    }
  }
}

solve(0);
