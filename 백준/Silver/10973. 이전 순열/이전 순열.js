let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map((v) => v.split(" ").map(Number));

const arr = input[1];

function solution(nums) {
  let i = nums.length - 2;
  while (i >= 0 && nums[i] <= nums[i + 1]) {
    i--;
  }
  if (i === -1) return -1;
  if (i >= 0) {
    let j = nums.length - 1;
    while (nums[j] >= nums[i]) {
      j--;
    }
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
  let left = i + 1;
  let right = nums.length - 1;

  while (left < right) {
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }
  return nums;
}
const answer = solution(arr);
if (answer === -1) console.log(answer);
else console.log(answer.join(" "));
