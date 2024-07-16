let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const M = Number(input[1]);

const graph = Array.from({ length: N + 1 }, () => []);

for (let i = 2; i < M + 2; i++) {
  const [from, to, cost] = input[i].split(" ").map(Number);
  graph[from].push({ to, cost });
}

const [start, end] = input[M + 2].split(" ").map(Number);

class MinHeap {
  constructor() {
    this.heap = [];
  }
  insert(item) {
    this.heap.push(item);
    this.bubbleUp();
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      let element = this.heap[index];
      let parentIndex = Math.floor((index - 1) / 2);
      let parent = this.heap[parentIndex];
      if (parent[0] <= element[0]) break;

      this.heap[index] = parent;
      this.heap[parentIndex] = element;
      index = parentIndex;
    }
  }

  extractMin() {
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }

  sinkDown(index) {
    let length = this.heap.length;
    let element = this.heap[index];

    while (true) {
      let leftChildIndex = 2 * index + 1;
      let rightChildIndex = 2 * index + 2;
      let leftChild, rightChild;
      let swap = null;
      if (leftChildIndex < length) {
        leftChild = this.heap[leftChildIndex];
        if (leftChild[0] < element[0]) swap = leftChildIndex;
      }
      if (rightChildIndex < length) {
        rightChild = this.heap[rightChildIndex];
        if (
          (swap === null && rightChild[0] < element[0]) ||
          (swap !== null && rightChild[0] < leftChild[0])
        ) {
          swap = rightChildIndex;
        }
      }
      if (swap === null) break;
      this.heap[index] = this.heap[swap];
      this.heap[swap] = element;
      index = swap;
    }
  }

  size() {
    return this.heap.length;
  }
}

const dijkstra = (start) => {
  const distance = Array(N + 1).fill(Infinity);
  const prev = Array(N + 1).fill(null);
  const pq = new MinHeap();
  pq.insert([0, start]);

  distance[start] = 0;

  while (pq.size()) {
    const [curCost, curNode] = pq.extractMin();

    if (curCost > distance[curNode]) continue;

    for (const { to, cost } of graph[curNode]) {
      const newCost = curCost + cost;

      if (newCost < distance[to]) {
        distance[to] = newCost;
        prev[to] = curNode;
        pq.insert([newCost, to]);
      }
    }
  }

  return { distance, prev };
};

const { distance, prev } = dijkstra(start);

const getPath = (prev, end) => {
  const path = [];
  let node = end;

  while (node !== null) {
    path.push(node);
    node = prev[node];
  }
  return path.reverse();
};

const path = getPath(prev, end);

console.log(distance[end]);
console.log(path.length);
console.log(path.join(" "));
