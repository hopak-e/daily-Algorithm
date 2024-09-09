let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);

// 간선 정보 저장
const edges = [];
for (let i = 1; i <= M; i++) {
  const [a, b, c] = input[i + 1].split(" ").map(Number); // i + 1로 수정
  edges.push([c, a, b]); // 비용을 첫번째 요소로 해서 정렬을 쉽게 하기 위함
}

// 간선을 비용 순으로 오름차순 정렬
edges.sort((a, b) => a[0] - b[0]);

// 유니온 파인드용 배열
const parent = Array.from({ length: N + 1 }, (_, i) => i);

// 유니온 파인드의 find 함수 (경로 압축 적용)
const find = (x) => {
  if (parent[x] !== x) {
    parent[x] = find(parent[x]);
  }
  return parent[x];
};

// 유니온 파인드의 union 함수
const union = (x, y) => {
  const rootX = find(x);
  const rootY = find(y);
  if (rootX !== rootY) {
    parent[rootY] = rootX; // rootX로 연결
  }
};

// 크루스칼 알고리즘 실행
let totalCost = 0;
let edgeCount = 0;

for (const [cost, a, b] of edges) {
  if (find(a) !== find(b)) {
    union(a, b);
    totalCost += cost;
    edgeCount++;

    // N-1개의 간선을 연결했으면 MST 완성
    if (edgeCount === N - 1) break;
  }
}

// 결과 출력
console.log(totalCost);
