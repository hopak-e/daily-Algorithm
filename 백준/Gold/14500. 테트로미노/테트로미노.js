let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");
const [len, ...nums] = input;
const [N, M] = len.split(" ").map(Number);
const arr = nums.map((v) => v.split(" ").map(Number));

let max = 0;

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (i + 3 < N) {
      const sum = arr[i][j] + arr[i + 1][j] + arr[i + 2][j] + arr[i + 3][j];
      max = Math.max(sum, max);
    }
    if (j + 3 < M) {
      const sum = arr[i][j] + arr[i][j + 1] + arr[i][j + 2] + arr[i][j + 3];
      max = Math.max(sum, max);
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (i + 1 < N && j + 1 < M) {
      const sum = arr[i][j] + arr[i + 1][j] + arr[i][j + 1] + arr[i + 1][j + 1];
      max = Math.max(sum, max);
    }
  }
}
// ..l l..
for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (i + 2 < N && j + 1 < M) {
      const sum1 =
        arr[i][j] + arr[i + 1][j] + arr[i + 2][j] + arr[i + 2][j + 1];
      const sum2 =
        arr[i][j + 1] + arr[i + 1][j + 1] + arr[i + 2][j + 1] + arr[i + 2][j];
      const sum3 = arr[i][j] + arr[i][j + 1] + arr[i + 1][j] + arr[i + 2][j];
      const sum4 =
        arr[i][j] + arr[i][j + 1] + arr[i + 1][j + 1] + arr[i + 2][j + 1];
      max = Math.max(sum1, sum2, sum3, sum4, max);
    }
    if (i + 1 < N && j + 2 < M) {
      const sum1 =
        arr[i][j] + arr[i + 1][j] + arr[i + 1][j + 1] + arr[i + 1][j + 2];
      const sum2 = arr[i][j] + arr[i + 1][j] + arr[i][j + 1] + arr[i][j + 2];
      const sum3 =
        arr[i][j] + arr[i][j + 1] + arr[i][j + 2] + arr[i + 1][j + 2];
      const sum4 =
        arr[i][j + 2] + arr[i + 1][j + 2] + arr[i + 1][j + 1] + arr[i + 1][j];
      max = Math.max(sum1, sum2, sum3, sum4, max);
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (i + 2 < N && j + 1 < M) {
      const sum1 =
        arr[i][j] + arr[i + 1][j] + arr[i + 1][j + 1] + arr[i + 2][j + 1];
      const sum2 =
        arr[i][j + 1] + arr[i + 1][j + 1] + arr[i + 1][j] + arr[i + 2][j];

      max = Math.max(sum1, sum2, max);
    }
    if (i + 1 < N && j + 2 < M) {
      const sum1 =
        arr[i + 1][j] + arr[i][j + 1] + arr[i][j + 2] + arr[i + 1][j + 1];
      const sum2 =
        arr[i][j] + arr[i][j + 1] + arr[i + 1][j + 1] + arr[i + 1][j + 2];
      max = Math.max(sum1, sum2, max);
    }
  }
}

for (let i = 0; i < N; i++) {
  for (let j = 0; j < M; j++) {
    if (i + 1 < N && j + 2 < M) {
      const sum1 =
        arr[i][j] + arr[i][j + 1] + arr[i][j + 2] + arr[i + 1][j + 1];
      const sum2 =
        arr[i][j + 1] + arr[i + 1][j] + arr[i + 1][j + 1] + arr[i + 1][j + 2];
      max = Math.max(sum1, sum2, max);
    }
    if (i + 2 < N && j + 1 < M) {
      const sum1 =
        arr[i][j] + arr[i + 1][j] + arr[i + 2][j] + arr[i + 1][j + 1];
      const sum2 =
        arr[i][j + 1] + arr[i + 1][j] + arr[i + 1][j + 1] + arr[i + 2][j + 1];
      max = Math.max(sum1, sum2, max);
    }
  }
}
console.log(max);