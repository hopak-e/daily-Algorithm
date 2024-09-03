let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = parseInt(input[0]);
let board = input.slice(1).map((line) => line.trim().split(" ").map(Number));
const rotate = (board) => {
  let newBoard = Array.from(Array(N), () => Array(N).fill(0));
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      newBoard[j][i] = board[i][j];
    }
  }
  return newBoard;
};

const goUp = (board) => {
  board = rotate(board);
  let newBoard = [];
  for (let i = 0; i < N; i++) {
    let now = board[i].filter((v) => v != 0);
    for (let j = 1; j < now.length; j++) {
      if (now[j] == now[j - 1]) {
        now[j - 1] *= 2;
        now[j] = 0;
      }
    }
    now = now.filter((v) => v != 0);
    while (now.length < N) {
      now.push(0);
    }
    newBoard.push(now);
  }
  return rotate(newBoard);
};

const goDown = (board) => {
  board = rotate(board);
  let newBoard = [];
  for (let i = 0; i < N; i++) {
    let now = board[i].reverse().filter((v) => v != 0);
    for (let j = 1; j < now.length; j++) {
      if (now[j] == now[j - 1]) {
        now[j - 1] *= 2;
        now[j] = 0;
      }
    }
    now = now.filter((v) => v != 0);
    while (now.length < N) {
      now.push(0);
    }
    newBoard.push(now.reverse());
  }
  return rotate(newBoard);
};

const goLeft = (board) => {
  let newBoard = [];
  for (let i = 0; i < N; i++) {
    let now = board[i].filter((v) => v != 0);
    for (let j = 1; j < now.length; j++) {
      if (now[j] == now[j - 1]) {
        now[j - 1] *= 2;
        now[j] = 0;
      }
    }
    now = now.filter((v) => v != 0);
    while (now.length < N) {
      now.push(0);
    }
    newBoard.push(now);
  }
  return newBoard;
};

const goRight = (board) => {
  let newBoard = [];
  for (let i = 0; i < N; i++) {
    let now = board[i].reverse().filter((v) => v != 0);
    for (let j = 1; j < now.length; j++) {
      if (now[j] == now[j - 1]) {
        now[j - 1] *= 2;
        now[j] = 0;
      }
    }
    now = now.filter((v) => v != 0);
    while (now.length < N) {
      now.push(0);
    }
    newBoard.push(now.reverse());
  }
  return newBoard;
};

const solution = (N, map) => {
  let q = [];
  let answer = 0;
  q.push([map, 0]);
  while (q.length > 0) {
    const [board, cnt] = q.shift();
    if (cnt == 5) {
      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          if (answer < board[i][j]) {
            answer = board[i][j];
          }
        }
      }
    } else {
      q.push([goUp([...board]), cnt + 1]);
      q.push([goDown([...board]), cnt + 1]);
      q.push([goLeft([...board]), cnt + 1]);
      q.push([goRight([...board]), cnt + 1]);
    }
  }

  console.log(answer);
};

solution(N, board);