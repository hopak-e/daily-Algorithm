let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0], 10);
const A = input[1].split(" ").map(Number);
const M = parseInt(input[2], 10);
const queries = input[3].split(" ").map(Number);

function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      return true;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return false;
}

A.sort((a, b) => a - b);

const results = queries.map((query) => (binarySearch(A, query) ? 1 : 0));

console.log(results.join("\n"));
