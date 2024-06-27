let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, B] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const solution = (N, M, B, arr) => {
  let minTime = Infinity;
  let height = 0;

  for (let target = 0; target <= 256; target++) {
    let remove = 0;
    let add = 0;

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (arr[i][j] > target) {
          remove += arr[i][j] - target;
        } else {
          add += target - arr[i][j];
        }
      }
    }

    if (remove + B >= add) {
      let time = remove * 2 + add;
      if (time <= minTime) {
        minTime = time;
        height = target;
      }
    }
  }
  return [minTime, height];
};

const answer = solution(N, M, B, arr);
console.log(answer[0], answer[1]);