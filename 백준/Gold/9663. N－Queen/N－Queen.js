let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const nQueen = (n) => {
  let count = 0;
  const board = Array.from({ length: n }, () => Array(n).fill(false));
  const cols = Array(n).fill(false);
  const diag1 = Array(2 * n - 1).fill(false); //row-col
  const diag2 = Array(2 * n - 1).fill(false);

  const makeQueen = (row) => {
    if (row === n) {
      count++;
      return;
    }

    for (let col = 0; col < N; col++) {
      if (!cols[col] && !diag1[row - col + n - 1] && !diag2[row + col]) {
        board[row][col] = true;
        cols[col] = true;
        diag1[row - col + n - 1] = true;
        diag2[row + col] = true;

        makeQueen(row + 1);

        board[row][col] = false;
        cols[col] = false;
        diag1[row - col + n - 1] = false;
        diag2[row + col] = false;
      }
    }
  };
  makeQueen(0);
  return count;
};
console.log(nQueen(N));
