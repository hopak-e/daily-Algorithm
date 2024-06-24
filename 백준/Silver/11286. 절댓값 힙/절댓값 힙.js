let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n")
  .map(Number);

const N = input[0];
const order = input.slice(1);

class AbsHeap {
  constructor() {
    this.heap = [];
  }

  insert(val) {
    this.heap.push(val);
    this.heapifyUp();
  }

  extractMin() {
    if (this.heap.length === 0) return 0;
    if (this.heap.length === 1) return this.heap.pop();

    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return min;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let parentIndex = Math.floor((index - 1) / 2);
      if (this.compare(this.heap[parentIndex], this.heap[index]) <= 0) break;

      [this.heap[parentIndex], this.heap[index]] = [
        this.heap[index],
        this.heap[parentIndex],
      ];
      index = parentIndex;
    }
  }

  heapifyDown() {
    let index = 0;
    const length = this.heap.length;
    const element = this.heap[0];

    while (true) {
      let leftIndex = 2 * index + 1;
      let rightIndex = 2 * index + 2;
      let swap = null;

      if (leftIndex < length) {
        if (this.compare(this.heap[leftIndex], element) < 0) {
          swap = leftIndex;
        }
      }

      if (rightIndex < length) {
        if (
          (swap === null && this.compare(this.heap[rightIndex], element) < 0) ||
          (swap !== null &&
            this.compare(this.heap[rightIndex], this.heap[leftIndex]) < 0)
        ) {
          swap = rightIndex;
        }
      }

      if (swap === null) break;

      [this.heap[index], this.heap[swap]] = [this.heap[swap], this.heap[index]];
      index = swap;
    }
  }

  compare(a, b) {
    const absA = Math.abs(a);
    const absB = Math.abs(b);
    if (absA === absB) return a - b;
    return absA - absB;
  }
}

const maxHeap = new AbsHeap();
const answer = [];

for (let i = 0; i < N; i++) {
  const x = order[i];
  if (x === 0) {
    answer.push(maxHeap.extractMin());
  } else {
    maxHeap.insert(x);
  }
}

console.log(answer.join("\n"));
