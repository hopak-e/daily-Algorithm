let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [R, C] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(""));

const water = [];
const go = [];
const visited = Array.from({ length: R }, () => Array(C).fill(false));

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

let beaX, beaY;

for (let i = 0; i < R; i++) {
  for (let j = 0; j < C; j++) {
    if (arr[i][j] === "S") {
      go.push([i, j, 0]);
      visited[i][j] = true;
      arr[i][j] = ".";
    } else if (arr[i][j] === "*") {
      water.push([i, j]);
    } else if (arr[i][j] === "D") {
      beaY = i;
      beaX = j;
    }
  }
}

const expandWater = () => {
  const len = water.length;
  for (let i = 0; i < len; i++) {
    const [y, x] = water.shift();
    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;
      if (ny >= 0 && nx >= 0 && ny < R && nx < C && arr[ny][nx] === ".") {
        arr[ny][nx] = "*";
        water.push([ny, nx]);
      }
    }
  }
};

const moveGo = () => {
  const len = go.length;
  for (let i = 0; i < len; i++) {
    const [y, x, time] = go.shift();
    for (const [dy, dx] of dir) {
      const ny = y + dy;
      const nx = x + dx;
      if (ny === beaY && nx === beaX) {
        return time + 1;
      }
      if (
        ny >= 0 &&
        nx >= 0 &&
        ny < R &&
        nx < C &&
        !visited[ny][nx] &&
        arr[ny][nx] === "."
      ) {
        visited[ny][nx] = true;
        go.push([ny, nx, time + 1]);
      }
    }
  }
  return null;
};

while (go.length) {
  expandWater();
  const answer = moveGo();
  if (answer !== null) {
    console.log(answer);
    process.exit();
  }
}

console.log("KAKTUS");
