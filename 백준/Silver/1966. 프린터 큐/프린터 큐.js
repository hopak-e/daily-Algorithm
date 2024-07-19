let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const testCaseCount = parseInt(input[0]);
let index = 1;
let result = "";

for (let i = 0; i < testCaseCount; i++) {
  let [N, M] = input[index].split(" ").map(Number);
  index++;
  let priorities = input[index].split(" ").map(Number);
  index++;

  let queue = priorities.map((priority, idx) => ({ priority, idx }));
  let printOrder = 0;

  while (queue.length > 0) {
    let current = queue.shift();
    if (queue.some((doc) => doc.priority > current.priority)) {
      queue.push(current);
    } else {
      printOrder++;
      if (current.idx === M) {
        result += printOrder + "\n";
        break;
      }
    }
  }
}

console.log(result.trim());
