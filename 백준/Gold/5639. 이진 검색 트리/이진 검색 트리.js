let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

function solution(order) {
  function reset(order, start, end) {
    if (start > end) return null;
    let root = order[start];
    let rightIdx = start + 1;

    while (rightIdx <= end && order[rightIdx] < root) {
      rightIdx++;
    }

    return {
      value: root,
      left: reset(order, start + 1, rightIdx - 1),
      right: reset(order, rightIdx, end),
    };
  }

  function makeNewTree(node) {
    if (!node) return [];
    return [...makeNewTree(node.left), ...makeNewTree(node.right), node.value];
  }

  const tree = reset(order, 0, order.length - 1);
  return makeNewTree(tree);
}

console.log(solution(input).join("\n"));
