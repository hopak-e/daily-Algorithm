const input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const answer = [];
for (let z = 1; z < input.length; z++) {
  const inputs = input[z].split(" ");
  const result = [];
  for (let i = 0; i < inputs.length; i++) {
    let reverse = "";
    for (let j = inputs[i].length - 1; j >= 0; j--) {
      reverse += inputs[i][j];
    }
    result.push(reverse);
  }
  answer.push(result.join(" "));
}

console.log(answer.join("\n"));
