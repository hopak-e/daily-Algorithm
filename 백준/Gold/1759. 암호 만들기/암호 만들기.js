let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [L, C] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").sort();

const vowels = new Set(["a", "e", "i", "o", "u"]);
let tmp = [];
function dfs(start, combination) {
  if (combination.length === L) {
    tmp.push(combination);
  }
  for (let i = start; i < C; i++) {
    dfs(i + 1, combination + arr[i]);
  }
}

function isValid(password) {
  let vowelCount = 0;
  let consonantCount = 0;
  for (const char of password) {
    if (vowels.has(char)) {
      vowelCount++;
    } else {
      consonantCount++;
    }
  }
  return vowelCount >= 1 && consonantCount >= 2;
}

dfs(0, "");

const validPassword = tmp.filter(isValid);
validPassword.forEach((v) => console.log(v));
