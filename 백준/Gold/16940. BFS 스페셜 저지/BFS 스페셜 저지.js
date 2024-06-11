let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const arr = Array.from({ length: N + 1 }, () => []);

for (let i = 1; i < N; i++) {
  const [u, v] = input[i].split(" ").map(Number);
  arr[u].push(v);
  arr[v].push(u);
}

const confirmArr = input[N].split(" ").map(Number);
const position = Array(N + 1).fill(0);
for (let i = 0; i < N; i++) {
  position[confirmArr[i]] = i;
}

for (let i = 1; i <= N; i++) {
  arr[i].sort((a, b) => position[a] - position[b]);
}

const queue = [1];
const visited = Array(N + 1).fill(false);
visited[1] = true;

let idx = 0;

while (queue.length) {
  const node = queue.shift();

  if (confirmArr[idx] !== node) {
    console.log(0);
    return;
  }
  idx++;

  for (const neighbor of arr[node]) {
    if (!visited[neighbor]) {
      visited[neighbor] = true;
      queue.push(neighbor);
    }
  }
}
console.log(1);
