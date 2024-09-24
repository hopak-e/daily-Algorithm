let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const arr = input.slice(2, N + 2).map((v) => v.split(" ").map(Number));
const plan = input[N + 2].split(" ").map(Number);

const parent = Array.from({ length: N + 1 }, (_, i) => i);

function find(x) {
  if (parent[x] === x) return x;
  return (parent[x] = find(parent[x])); // 경로 압축
}

// Union 함수: 두 집합을 합치는 함수
function union(x, y) {
  const rootX = find(x);
  const rootY = find(y);
  if (rootX !== rootY) {
    parent[rootY] = rootX;
  }
}

// 연결된 도시들을 같은 집합으로 묶기
for (let i = 0; i < N; i++) {
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 1) {
      union(i + 1, j + 1); // i와 j 도시가 연결되어 있으면 합침 (도시는 1부터 시작)
    }
  }
}

// 여행 계획의 첫 번째 도시의 루트를 기준으로 모든 도시가 같은 루트인지 확인
let possible = true;
const firstCityRoot = find(plan[0]);

for (let i = 1; i < M; i++) {
  if (find(plan[i]) !== firstCityRoot) {
    possible = false;
    break;
  }
}

// 결과 출력
console.log(possible ? "YES" : "NO");
