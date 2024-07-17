let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [K, N] = input[0].split(" ").map(Number);
const cables = input.slice(1).map(Number);

function canMakeCables(length) {
  let count = 0;
  for (let cable of cables) {
    count += Math.floor(cable / length);
  }
  return count >= N;
}

function findMaxLengthOfCables(K, N, cables) {
  let left = 1;
  let right = Math.max(...cables);
  let answer = 0;

  while (left <= right) {
    let mid = Math.floor((left + right) / 2);

    if (canMakeCables(mid)) {
      answer = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return answer;
}

console.log(findMaxLengthOfCables(K, N, cables));
