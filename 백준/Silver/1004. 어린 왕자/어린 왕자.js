let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input[0]);
let idx = 1;

const inside = (x1, y1, cx, cy, r) => {
  return (x1 - cx) ** 2 + (y1 - cy) ** 2 < r ** 2;
};

let result = [];

for (let t = 0; t < T; t++) {
  const [x1, y1, x2, y2] = input[idx].split(" ").map(Number);
  const n = Number(input[idx + 1]);
  let count = 0;

  for (let i = 0; i < n; i++) {
    const [cx, cy, r] = input[idx + 2 + i].split(" ").map(Number);
    const start = inside(x1, y1, cx, cy, r);
    const end = inside(x2, y2, cx, cy, r);

    if (start !== end) {
      count++;
    }
  }

  result.push(count);
  idx += n + 2;
}

console.log(result.join("\n"));
