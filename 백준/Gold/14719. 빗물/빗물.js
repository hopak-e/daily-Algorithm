let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [H, W] = input[0].split(" ").map(Number);
const heights = input[1].split(" ").map(Number);

let totalWater = 0;

const leftMax = Array(W).fill(0);
const rightMax = Array(W).fill(0);

leftMax[0] = heights[0];
for (let i = 1; i < W; i++) {
  leftMax[i] = Math.max(leftMax[i - 1], heights[i]);
}

rightMax[W - 1] = heights[W - 1];
for (let i = W - 2; i >= 0; i--) {
  rightMax[i] = Math.max(rightMax[i + 1], heights[i]);
}

for (let i = 0; i < W; i++) {
  const minHeight = Math.min(leftMax[i], rightMax[i]);
  if (minHeight > heights[i]) {
    totalWater += minHeight - heights[i];
  }
}

console.log(totalWater);
