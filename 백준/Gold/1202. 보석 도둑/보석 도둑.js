let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

// 보석 N
// 무게 M
// 가격 V
// 가방 K 최대무게 C 한개의보석만 가능

const [N, K] = input[0].split(" ").map(Number);
const jewels = [];
const bags = [];

// 보석 정보 입력
for (let i = 1; i <= N; i++) {
  const [M, V] = input[i].split(" ").map(Number);
  jewels.push([M, V]); // 무게 M, 가격 V
}

// 가방 정보 입력
for (let i = N + 1; i <= N + K; i++) {
  bags.push(Number(input[i]));
}

// 무게를 기준으로 오름차순 정렬
jewels.sort((a, b) => a[0] - b[0]); // 보석은 무게 순
bags.sort((a, b) => a - b); // 가방은 용량 순

let totalValue = 0;
let jewelIndex = 0;
const maxHeap = [];

// 최대 힙 삽입 함수
function heapPush(heap, value) {
  heap.push(value);
  let idx = heap.length - 1;

  while (idx > 0) {
    const parentIdx = Math.floor((idx - 1) / 2);
    if (heap[parentIdx] >= heap[idx]) break;
    [heap[parentIdx], heap[idx]] = [heap[idx], heap[parentIdx]];
    idx = parentIdx;
  }
}

// 최대 힙에서 최대값 제거 함수
function heapPop(heap) {
  if (heap.length === 0) return null;
  const maxValue = heap[0];
  const end = heap.pop();

  if (heap.length > 0) {
    heap[0] = end;
    let idx = 0;

    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swapIdx = null;

      if (leftIdx < heap.length && heap[leftIdx] > heap[idx]) {
        swapIdx = leftIdx;
      }
      if (
        rightIdx < heap.length &&
        heap[rightIdx] > (swapIdx === null ? heap[idx] : heap[leftIdx])
      ) {
        swapIdx = rightIdx;
      }
      if (swapIdx === null) break;

      [heap[idx], heap[swapIdx]] = [heap[swapIdx], heap[idx]];
      idx = swapIdx;
    }
  }

  return maxValue;
}

// 각 가방에 대해서 처리
for (let i = 0; i < K; i++) {
  const bagCapacity = bags[i];

  // 현재 가방에 담을 수 있는 보석들을 힙에 넣음
  while (jewelIndex < N && jewels[jewelIndex][0] <= bagCapacity) {
    const [_, value] = jewels[jewelIndex];
    heapPush(maxHeap, value);
    jewelIndex++;
  }

  // 힙에서 가장 큰 가치의 보석을 꺼내서 담음
  if (maxHeap.length > 0) {
    totalValue += heapPop(maxHeap);
  }
}

console.log(totalValue);
