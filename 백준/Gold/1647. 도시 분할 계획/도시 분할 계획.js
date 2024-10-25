let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const edges = input.slice(1).map((line) => line.split(" ").map(Number));

// 간선을 비용 기준으로 오름차순 정렬
edges.sort((a, b) => a[2] - b[2]);

// Union-Find (Disjoint Set)을 위한 부모 배열과 랭크 배열
const parent = Array.from({ length: N + 1 }, (_, idx) => idx);
const rank = Array(N + 1).fill(0);

// find 함수 (경로 압축 적용)
function find(x) {
  if (parent[x] !== x) {
    parent[x] = find(parent[x]); // 경로 압축
  }
  return parent[x];
}

// union 함수 (Union by rank 적용)
function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);

  if (rootX !== rootY) {
    if (rank[rootX] > rank[rootY]) {
      parent[rootY] = rootX;
    } else if (rank[rootX] < rank[rootY]) {
      parent[rootX] = rootY;
    } else {
      parent[rootY] = rootX;
      rank[rootX]++;
    }
  }
}

let totalCost = 0;
let maxEdge = 0;

// 크루스칼 알고리즘으로 최소 스패닝 트리 형성
for (const [A, B, C] of edges) {
  if (find(A) !== find(B)) {
    union(A, B);
    totalCost += C;
    maxEdge = C; // 현재까지 추가된 간선 중 가장 비용이 큰 간선
  }
}

// 가장 큰 간선 비용을 제외한 최소 유지비 합
console.log(totalCost - maxEdge);