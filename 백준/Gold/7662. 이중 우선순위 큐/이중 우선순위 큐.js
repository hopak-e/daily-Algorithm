let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const T = Number(input[0]);

const createHeap = (compareFunc) => {
  const heap = [];

  const bubbleUp = () => {
    let idx = heap.length - 1;
    while (idx) {
      const parendIdx = Math.floor((idx - 1) / 2);
      if (compareFunc(heap[idx], heap[parendIdx])) {
        [heap[idx], heap[parendIdx]] = [heap[parendIdx], heap[idx]];
        idx = parendIdx;
      } else {
        break;
      }
    }
  };

  const bubbleDown = (idx) => {
    const len = heap.length;
    const value = heap[idx];
    while (true) {
      const leftIdx = 2 * idx + 1;
      const rightIdx = 2 * idx + 2;
      let swapIdx = null;

      if (leftIdx < len && compareFunc(heap[leftIdx], value)) {
        swapIdx = leftIdx;
      }
      if (
        rightIdx < len &&
        compareFunc(heap[rightIdx], swapIdx === null ? value : heap[swapIdx])
      ) {
        swapIdx = rightIdx;
      }
      if (swapIdx === null) break;

      [heap[idx], heap[swapIdx]] = [heap[swapIdx], heap[idx]];
      idx = swapIdx;
    }
  };

  return {
    push: (value) => {
      heap.push(value);
      bubbleUp();
    },
    pop: () => {
      if (heap.length === 1) return heap.pop();
      const root = heap[0];
      heap[0] = heap.pop();
      bubbleDown(0);
      return root;
    },
    peek: () => heap[0],
    size: () => heap.length,
    remove: (value) => {
      const idx = heap.indexOf(value);
      if (idx === -1) return false;
      if (idx === heap.length - 1) {
        heap.pop();
      } else {
        heap[idx] = heap.pop();
        bubbleDown(idx);
      }
      return true;
    },
  };
};

const processCommands = (commands) => {
  const minHeap = createHeap((a, b) => a < b);
  const maxHeap = createHeap((a, b) => a > b);
  const map = new Map();

  commands.forEach((command) => {
    const [op, numStr] = command.split(" ");
    const num = Number(numStr);

    if (op === "I") {
      minHeap.push(num);
      maxHeap.push(num);
      map.set(num, (map.get(num) || 0) + 1);
    } else if (op === "D") {
      if (num === 1) {
        while (maxHeap.size() > 0) {
          const max = maxHeap.pop();
          if (map.get(max) > 0) {
            map.set(max, map.get(max) - 1);
            break;
          }
        }
      } else if (num === -1) {
        while (minHeap.size() > 0) {
          const min = minHeap.pop();
          if (map.get(min) > 0) {
            map.set(min, map.get(min) - 1);
            break;
          }
        }
      }
    }
  });

  let min, max;
  while (minHeap.size() > 0) {
    min = minHeap.pop();
    if (map.get(min) > 0) {
      minHeap.push(min);
      break;
    }
  }
  while (maxHeap.size() > 0) {
    max = maxHeap.pop();
    if (map.get(max) > 0) {
      maxHeap.push(max);
      break;
    }
  }

  if (minHeap.size() === 0 || maxHeap.size() === 0) {
    return "EMPTY";
  } else {
    return `${maxHeap.peek()} ${minHeap.peek()}`;
  }
};

let idx = 1;
const result = [];
for (let i = 0; i < T; i++) {
  const k = Number(input[idx]);
  const commands = input.slice(idx + 1, idx + 1 + k);
  result.push(processCommands(commands));
  idx += 1 + k;
}

console.log(result.join("\n"));