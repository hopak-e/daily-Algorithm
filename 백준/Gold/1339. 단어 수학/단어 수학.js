let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);
const words = input.slice(1);

const weights = {};

// 단어를 역순으로 처리하여 가중치 계산
words.forEach((word) => {
  let len = word.length;
  for (let i = 0; i < len; i++) {
    const char = word[i];
    const positionValue = Math.pow(10, len - i - 1); // 자릿수에 따른 값
    if (weights[char]) {
      weights[char] += positionValue;
    } else {
      weights[char] = positionValue;
    }
  }
});

// 가중치가 큰 알파벳부터 정렬
const sortedWeights = Object.entries(weights).sort((a, b) => b[1] - a[1]);

// 가중치가 큰 알파벳부터 9, 8, 7, ... 할당
let number = 9;
const charToNum = {};
sortedWeights.forEach(([char]) => {
  charToNum[char] = number--;
});

// 각 단어를 숫자로 바꿔 합산
let totalSum = 0;
words.forEach((word) => {
  let numStr = "";
  for (const char of word) {
    numStr += charToNum[char];
  }
  totalSum += Number(numStr);
});

console.log(totalSum);
