let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();
// .split("\n");

const [F, S, G, U, D] = input.split(" ").map(Number);

const bfs = () => {
  let visited = Array(F + 1).fill(false);
  let queue = [[S, 0]];
  visited[S] = true;

  while (queue.length) {
    const [cur, step] = queue.shift();

    if (cur === G) {
      return step;
    }

    if (cur + U <= F && !visited[cur + U]) {
      visited[cur + U] = true;
      queue.push([cur + U, step + 1]);
    }

    if (cur - D >= 1 && !visited[cur - D]) {
      visited[cur - D] = true;
      queue.push([cur - D, step + 1]);
    }
  }

  return "use the stairs";
};

console.log(bfs());
