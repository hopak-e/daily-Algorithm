let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [num, N, broken] = [...input];

if (num === 100) console.log(0);

let answer = Math.abs(100 - num);
let btn = N > 0 ? broken.split(" ") : [];

for (let i = 0; i <= 1000000; i++) {
  const str = i.toString();
  let isValid = true;
  for (let j = 0; j < str.length; j++) {
    if (btn.includes(str[j])) {
      isValid = false;
      break;
    }
  }

  if (isValid) {
    answer = Math.min(answer, Math.abs(i - num) + str.length);
  }
}
console.log(answer);