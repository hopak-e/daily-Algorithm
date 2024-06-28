let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);
const arr = input.slice(2, M + 2).map((v) => v.split(" ").map(Number));
const [start, end] = input[M + 2].split(" ").map(Number);

const INF = 100000000;
const graph = Array.from({ length: N + 1 }, () => []);
const distance = Array(N + 1).fill(INF);

for (const [u, v, cost] of arr) {
  graph[u].push([v, cost]);
}

class MinHeap {
  constructor() {
    this.heap = [];
  }

  push(node) {
    this.heap.push(node);
    this.bubbleUp();
  }

  pop() {
    if (this.heap.length === 1) return this.heap.pop();
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    const last = this.heap[index];
    while (index) {
      const parentIndex = Math.floor((index - 1) / 2);
      const parent = this.heap[parentIndex];
      if (last[0] >= parent[0]) break;
      this.heap[index] = parent;
      index = parentIndex;
    }
    this.heap[index] = last;
  }

  bubbleDown() {
    let index = 0;
    const length = this.heap.length;
    const node = this.heap[index];

    while (true) {
      const leftIndex = 2 * index + 1;
      const rightIndex = 2 * index + 2;
      let swap = null;

      if (leftIndex < length) {
        const leftChild = this.heap[leftIndex];
        if (leftChild[0] < node[0]) {
          swap = leftIndex;
        }
      }

      if (rightIndex < length) {
        const rightChild = this.heap[rightIndex];
        if (
          (swap === null && rightChild[0] < node[0]) ||
          (swap !== null && rightChild[0] < this.heap[swap][0])
        ) {
          swap = rightIndex;
        }
      }

      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      index = swap;
    }
    this.heap[index] = node;
  }

  size() {
    return this.heap.length;
  }
}

const dijkstra = (start) => {
  const minHeap = new MinHeap();
  distance[start] = 0;
  minHeap.push([0, start]);

  while (minHeap.size()) {
    const [dist, current] = minHeap.pop();

    if (distance[current] < dist) continue;

    for (const [next, cost] of graph[current]) {
      const newDist = dist + cost;
      if (newDist < distance[next]) {
        distance[next] = newDist;
        minHeap.push([newDist, next]);
      }
    }
  }
};

dijkstra(start);
console.log(distance[end]);
