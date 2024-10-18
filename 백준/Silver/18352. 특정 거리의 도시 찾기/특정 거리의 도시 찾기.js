let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M, K, X] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const graph = Array.from({ length: N + 1 }, () => []);

for (let [A, B] of arr) {
  graph[A].push(B);
}

const distance = Array(N + 1).fill(-1);
distance[X] = 0;

const queue = [];
queue.push(X);

while (queue.length > 0) {
  const current = queue.shift();

  for (let next of graph[current]) {
    if (distance[next] === -1) {
      distance[next] = distance[current] + 1;
      queue.push(next);
    }
  }
}

const result = [];
for (let i = 1; i <= N; i++) {
  if (distance[i] === K) {
    result.push(i);
  }
}

if (result.length > 0) {
  console.log(result.join("\n"));
} else {
  console.log(-1);
}
