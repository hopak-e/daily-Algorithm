let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

const str = input.split("-");
let answer = 0;

for (let i = 0; i < str.length; i++) {
  if (isNaN(Number(str[i]))) {
    const num = str[i].split("+").map(Number);

    let sum = 0;
    for (let j = 0; j < num.length; j++) {
      sum += num[j];
    }
    if (i === 0) {
      answer += sum;
    } else {
      answer -= sum;
    }
  } else {
    if (i === 0) {
      answer += Number(str[i]);
    } else {
      answer -= Number(str[i]);
    }
  }
}
console.log(answer);