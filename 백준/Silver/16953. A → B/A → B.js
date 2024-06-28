let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [start, end] = input[0].split(" ").map(Number);

const bfs = (start, startCount) => {
  const queue = [[start, startCount]];

  while (queue.length) {
    const [current, count] = queue.shift();
    if (current === end) {
      return count + 1;
    }
    const twice = current * 2;
    if (twice <= end) {
      queue.push([twice, count + 1]);
    }
    const plus = current * 10 + 1;
    if (plus <= end) {
      queue.push([plus, count + 1]);
    }
  }
  return -1;
};
console.log(bfs(start, 0));
