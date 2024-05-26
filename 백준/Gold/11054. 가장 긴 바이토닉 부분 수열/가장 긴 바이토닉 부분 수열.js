let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const N = Number(input[0]);
const nums = input[1].split(" ").map(Number);

const upDp = Array.from({ length: N }).fill(0);
const downDp = Array.from({ length: N }).fill(0);

upDp[0] = 1;
downDp[N] = 1;

for (let i = 0; i < N; i++) {
  let cnt = 1;
  for (let j = 0; j < i; j++) {
    if (nums[j] < nums[i]) {
      cnt = Math.max(cnt, upDp[j] + 1);
    }
  }
  upDp[i] = cnt;
}

for (let i = N - 1; i >= 0; i--) {
  let cnt = 1;
  for (let j = i + 1; j <= N; j++) {
    if (nums[j] < nums[i]) {
      cnt = Math.max(cnt, downDp[j] + 1);
    }
  }
  downDp[i] = cnt;
}

console.log(Math.max(...upDp.map((el, idx) => el + downDp[idx])) - 1);