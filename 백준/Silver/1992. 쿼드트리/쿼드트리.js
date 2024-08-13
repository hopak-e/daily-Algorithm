let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const arr = input.slice(1).map((v) => v.split(""));

const solution = (y, x, size) => {
  const first = arr[y][x];

  let isSame = true;

  for (let i = y; i < y + size; i++) {
    for (let j = x; j < x + size; j++) {
      if (arr[i][j] !== first) {
        isSame = false;
        break;
      }
    }
    if (!isSame) break;
  }
  if (isSame) {
    return first;
  } else {
    const half = size / 2;
    const leftTop = solution(y, x, half);
    const rightTop = solution(y, x + half, half);
    const leftBottom = solution(y + half, x, half);
    const rightBottom = solution(y + half, x + half, half);

    return `(${leftTop}${rightTop}${leftBottom}${rightBottom})`;
  }
};

const result = solution(0, 0, N);
console.log(result);
