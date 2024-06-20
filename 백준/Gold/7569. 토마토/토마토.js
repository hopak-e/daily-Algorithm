let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [M, N, H] = input[0].split(" ").map(Number);
const arr = [];

const dir = [
  [1, 0, 0],
  [0, 1, 0],
  [0, 0, 1],
  [-1, 0, 0],
  [0, -1, 0],
  [0, 0, -1],
];

const queue = [];
let total = 0;
let ripe = 0;

for (let h = 0; h < H; h++) {
  const box = [];
  for (let n = 0; n < N; n++) {
    const row = input[1 + h * N + n].split(" ").map(Number);
    box.push(row);
    for (let m = 0; m < M; m++) {
      if (row[m] === 1) {
        queue.push([h, n, m, 0]);
        ripe++;
      }
      if (row[m] !== -1) {
        total++;
      }
    }
  }
  arr.push(box);
}

if (ripe === total) {
  console.log(0);
  return;
}

let maxDay = 0;
let front = 0;
let back = queue.length;

while (front < back) {
  const [ch, cn, cm, days] = queue[front++];

  for (const [dh, dn, dm] of dir) {
    const nh = ch + dh;
    const nn = cn + dn;
    const nm = cm + dm;

    if (nh >= 0 && nh < H && nn >= 0 && nn < N && nm >= 0 && nm < M) {
      if (arr[nh][nn][nm] === 0) {
        arr[nh][nn][nm] = 1;
        queue.push([nh, nn, nm, days + 1]);
        ripe++;
        maxDay = Math.max(maxDay, days + 1);
        back++;
      }
    }
  }
}

if (ripe === total) {
  console.log(maxDay);
} else {
  console.log(-1);
}
