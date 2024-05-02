const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();

let str = input;
let answer = "";
while (str.length > 0) {
  if (str.length > 1) {
    answer =
      parseInt(str.slice(str.length - 1), 8)
        .toString(2)
        .padStart(3, "0") + answer;
  } else {
    answer = parseInt(str.slice(str.length - 1), 8).toString(2) + answer;
  }
  str = str.slice(0, str.length - 1);
}

console.log(answer);
