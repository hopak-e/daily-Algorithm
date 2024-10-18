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

  isEmpty() {
    return this.heap.length === 0;
  }
}

const [N, M] = input[0].split(" ").map(Number);
const graph = Array.from({ length: N + 1 }, () => []);
const inDegree = Array(N + 1).fill(0);

for (let i = 1; i <= M; i++) {
  const [A, B] = input[i].split(" ").map(Number);
  graph[A].push(B);
  inDegree[B]++;
}

const heap = new MinHeap();
const result = [];

for (let i = 1; i <= N; i++) {
  if (inDegree[i] === 0) {
    heap.insert(i);
  }
}

while (!heap.isEmpty()) {
  const current = heap.extractMin();
  result.push(current);

  for (const next of graph[current]) {
    inDegree[next]--;
    if (inDegree[next] === 0) {
      heap.insert(next);
    }
  }
}

console.log(result.join(" "));
