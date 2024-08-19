let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);

let [r, c, d] = input[1].split(" ").map(Number);

let room = input.slice(2).map((v) => v.split(" ").map(Number));

const dir = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

let count = 0;

const clean = () => {
  while (true) {
    if (room[r][c] === 0) {
      room[r][c] = 2;
      count++;
    }

    let found = false;

    for (let i = 0; i < 4; i++) {
      d = (d + 3) % 4;
      let nr = r + dir[d][0];
      let nc = c + dir[d][1];

      if (room[nr][nc] === 0) {
        r = nr;
        c = nc;
        found = true;
        break;
      }
    }

    if (!found) {
      let back = (d + 2) % 4;
      let nr = r + dir[back][0];
      let nc = c + dir[back][1];

      if (room[nr][nc] === 1) {
        break;
      } else {
        r = nr;
        c = nc;
      }
    }
  }
};

clean();

console.log(count);
