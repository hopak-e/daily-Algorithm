let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]); // 구역의 개수
const populations = input[1].split(" ").map(Number); // 각 구역의 인구
const adj = Array.from({ length: N + 1 }, () => []);

// 인접 리스트 구성
for (let i = 2; i < input.length; i++) {
  const [count, ...neighbors] = input[i].split(" ").map(Number);
  adj[i - 1].push(...neighbors);
}

// 부분 집합을 생성하여 두 선거구로 나눔
function generateSubsets(n) {
  const subsets = [];
  for (let mask = 1; mask < 1 << n; mask++) {
    const subset = [];
    for (let i = 0; i < n; i++) {
      if (mask & (1 << i)) subset.push(i + 1);
    }
    subsets.push(subset);
  }
  return subsets;
}

// 연결 여부 확인 (DFS)
function isConnected(nodes, adj) {
  if (nodes.length === 0) return false;

  const visited = new Set();
  const stack = [nodes[0]];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!visited.has(current)) {
      visited.add(current);
      for (const neighbor of adj[current]) {
        if (nodes.includes(neighbor)) stack.push(neighbor);
      }
    }
  }

  return visited.size === nodes.length;
}

// 두 선거구로 나눌 때 인구 차이 계산
function calculateMinDifference() {
  const subsets = generateSubsets(N);
  let minDifference = Infinity;

  for (const subsetA of subsets) {
    const subsetB = Array.from({ length: N }, (_, idx) => idx + 1).filter(
      (node) => !subsetA.includes(node)
    );

    if (isConnected(subsetA, adj) && isConnected(subsetB, adj)) {
      const populationA = subsetA.reduce(
        (sum, idx) => sum + populations[idx - 1],
        0
      );
      const populationB = subsetB.reduce(
        (sum, idx) => sum + populations[idx - 1],
        0
      );
      minDifference = Math.min(
        minDifference,
        Math.abs(populationA - populationB)
      );
    }
  }

  return minDifference === Infinity ? -1 : minDifference;
}

console.log(calculateMinDifference());
