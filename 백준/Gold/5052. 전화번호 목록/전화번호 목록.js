let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const t = Number(input[0]);
let idx = 1;
let result = [];

for (let i = 0; i < t; i++) {
  let n = Number(input[idx++]);
  let nums = [];

  for (let j = 0; j < n; j++) {
    nums.push(input[idx++]);
  }

  nums.sort();

  let isSame = true;
  for (let j = 0; j < n - 1; j++) {
    if (nums[j + 1].startsWith(nums[j])) {
      isSame = false;
      break;
    }
  }
  result.push(isSame ? "YES" : "NO");
}

console.log(result.join("\n"));
