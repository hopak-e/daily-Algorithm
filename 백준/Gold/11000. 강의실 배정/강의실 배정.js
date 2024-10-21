let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const lastInsertedValue = this.heap[index];

    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parentValue = this.heap[parentIndex];

      if (parentValue <= lastInsertedValue) break;

      this.heap[index] = parentValue;
      index = parentIndex;
    }

    this.heap[index] = lastInsertedValue;
  }

  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const last = this.heap.pop();

    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.bubbleDown();
    }

    return min;
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const value = this.heap[0];

    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestIndex = index;

      if (
        leftChildIndex < length &&
        this.heap[leftChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = leftChildIndex;
      }

      if (
        rightChildIndex < length &&
        this.heap[rightChildIndex] < this.heap[smallestIndex]
      ) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex === index) break;

      this.heap[index] = this.heap[smallestIndex];
      this.heap[smallestIndex] = value;
      index = smallestIndex;
    }
  }

  getMin() {
    return this.heap.length === 0 ? null : this.heap[0];
  }
}

const N = parseInt(input[0]);
const classes = input.slice(1).map((line) => line.split(" ").map(Number));

// 수업들을 시작 시간 기준으로 정렬
classes.sort((a, b) => a[0] - b[0]);

const heap = new MinHeap();

// 첫 수업의 끝나는 시간을 힙에 넣음
heap.insert(classes[0][1]);

for (let i = 1; i < N; i++) {
  const [start, end] = classes[i];

  // 가장 빨리 끝나는 수업을 꺼내서 현재 수업과 겹치는지 확인
  if (heap.getMin() <= start) {
    heap.extractMin();
  }

  // 현재 수업의 끝나는 시간을 힙에 넣음
  heap.insert(end);
}

// 최소 힙의 크기가 필요한 강의실 수
console.log(heap.heap.length);
