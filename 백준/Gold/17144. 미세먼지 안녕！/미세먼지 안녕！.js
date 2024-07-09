let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [R, C, T] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const dir = [
  [-1, 0],
  [0, -1],
  [1, 0],
  [0, 1],
];

const machineidx = [];
for (let r = 0; r < R; r++) {
  if (arr[r][0] === -1) {
    machineidx.push(r);
  }
}

const dust = () => {
  const newArr = Array.from({ length: R }, () => Array(C).fill(0));

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      if (arr[r][c] >= 5) {
        let spread = Math.floor(arr[r][c] / 5);
        let count = 0;

        for (let [dr, dc] of dir) {
          const nr = r + dr;
          const nc = c + dc;

          if (nr >= 0 && nr < R && nc >= 0 && nc < C && arr[nr][nc] !== -1) {
            newArr[nr][nc] += spread;
            count++;
          }
        }

        arr[r][c] -= spread * count;
      }
    }
  }

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      newArr[r][c] += arr[r][c];
    }
  }

  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      arr[r][c] = newArr[r][c];
    }
  }

  for (let r of machineidx) {
    arr[r][0] = -1;
  }
};

const machine = () => {
  const [t, b] = machineidx;

  for (let i = t - 1; i > 0; i--) arr[i][0] = arr[i - 1][0];
  for (let i = 0; i < C - 1; i++) arr[0][i] = arr[0][i + 1];
  for (let i = 0; i < t; i++) arr[i][C - 1] = arr[i + 1][C - 1];
  for (let i = C - 1; i > 1; i--) arr[t][i] = arr[t][i - 1];
  arr[t][1] = 0;

  for (let i = b + 1; i < R - 1; i++) arr[i][0] = arr[i + 1][0];
  for (let i = 0; i < C - 1; i++) arr[R - 1][i] = arr[R - 1][i + 1];
  for (let i = R - 1; i > b; i--) arr[i][C - 1] = arr[i - 1][C - 1];
  for (let i = C - 1; i > 1; i--) arr[b][i] = arr[b][i - 1];
  arr[b][1] = 0;
};

for (let t = 0; t < T; t++) {
  dust();
  machine();
}

let answer = 0;
for (let r = 0; r < R; r++) {
  for (let c = 0; c < C; c++) {
    answer += arr[r][c];
  }
}
console.log(answer + 2);
