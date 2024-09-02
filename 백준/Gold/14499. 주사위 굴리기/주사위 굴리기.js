let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, startX, startY, K] = input[0].split(" ").map(Number);
const arr = input.slice(1, N + 1).map((v) => v.split(" ").map(Number));
const command = input[N + 1].split(" ").map(Number);

const dice = [0, 0, 0, 0, 0, 0];

const dx = [0, 0, -1, 1];
const dy = [1, -1, 0, 0];

let x = startX;
let y = startY;

const solution = (dir) => {
  const nx = x + dx[dir];
  const ny = y + dy[dir];

  if (nx < 0 || ny < 0 || nx >= N || ny >= M) {
    return false;
  }

  let temp;

  if (dir === 0) {
    temp = [dice[3], dice[1], dice[0], dice[5], dice[4], dice[2]];
  }
  if (dir === 1) {
    temp = [dice[2], dice[1], dice[5], dice[0], dice[4], dice[3]];
  }
  if (dir === 2) {
    temp = [dice[4], dice[0], dice[2], dice[3], dice[5], dice[1]];
  }
  if (dir === 3) {
    temp = [dice[1], dice[5], dice[2], dice[3], dice[0], dice[4]];
  }

  for (let i = 0; i < 6; i++) {
    dice[i] = temp[i];
  }

  x = nx;
  y = ny;

  if (arr[x][y] === 0) {
    arr[x][y] = dice[5];
  } else {
    dice[5] = arr[x][y];
    arr[x][y] = 0;
  }

  console.log(dice[0]);
  return true;
};

command.forEach((v) => {
  solution(v - 1);
});
