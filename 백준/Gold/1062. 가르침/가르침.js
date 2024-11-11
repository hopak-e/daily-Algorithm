let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

//최소 5개는 돼야 글자 읽을수 있음
const [N, K] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.slice(4, -4));

function solution() {
  if (K < 5) {
    console.log(0);
    return;
  } else if (K === 26) {
    console.log(N);
    return;
  }

  const required = new Set(["a", "n", "t", "i", "c"]);
  const add = new Set();

  for (const word of arr) {
    for (const char of word) {
      if (!required.has(char)) {
        add.add(char);
      }
    }
  }

  const unique = Array.from(add);
  const max = Math.min(unique.length, K - 5);
  let maxReadable = 0;

  function isReadable(chars) {
    const readable = new Set(required);
    for (const char of chars) {
      readable.add(char);
    }
    let cnt = 0;
    for (const word of arr) {
      if (word.split("").every((v) => readable.has(v))) {
        cnt++;
      }
    }
    return cnt;
  }

  function combine(chars, start, depth, selected) {
    if (depth === max) {
      maxReadable = Math.max(maxReadable, isReadable(selected));
      return;
    }
    for (let i = start; i < chars.length; i++) {
      selected.push(chars[i]);
      combine(chars, i + 1, depth + 1, selected);
      selected.pop();
    }
  }
  if (max > 0) {
    combine(unique, 0, 0, []);
  } else {
    maxReadable = isReadable([]);
  }
  console.log(maxReadable);
}

solution();
