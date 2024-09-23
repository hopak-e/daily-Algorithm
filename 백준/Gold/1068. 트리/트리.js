let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const parents = input[1].split(" ").map(Number);
const deleteNode = Number(input[2]);

const tree = Array.from({ length: N }, () => []);
let root = -1;

// 트리 구성
for (let i = 0; i < N; i++) {
  if (parents[i] === -1) {
    root = i; // 루트 노드
  } else {
    tree[parents[i]].push(i); // 부모 노드에 자식 추가
  }
}

// 삭제할 노드와 그 자식들까지 삭제하는 함수
const removeNode = (node) => {
  for (let child of tree[node]) {
    removeNode(child); // 자식들도 재귀적으로 삭제
  }
  tree[node] = []; // 자식 리스트 비우기
};

// 트리에서 리프 노드의 개수를 세는 함수
const countLeafNodes = (node) => {
  if (node === deleteNode) return 0;

  // 자식이 없는 노드면 리프 노드
  if (tree[node].length === 0) return 1;

  // 자식들이 있으면 자식들에 대해서도 리프 노드 탐색
  let leafCount = 0;
  for (let child of tree[node]) {
    if (child !== deleteNode) {
      leafCount += countLeafNodes(child);
    }
  }

  // 자식이 삭제된 경우에도 부모가 리프 노드로 변하는지 확인
  if (leafCount === 0 && node !== deleteNode) return 1;
  return leafCount;
};

// 삭제할 노드가 루트인 경우 바로 0 출력
if (root === deleteNode) {
  console.log(0);
} else {
  removeNode(deleteNode); // 트리에서 삭제 노드를 제거
  const result = countLeafNodes(root); // 루트에서부터 리프 노드의 개수 세기
  console.log(result);
}
