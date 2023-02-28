const input = require("fs").readFileSync("/dev/stdin").toString().trim().split("\n");

const info = input[0].split(' ').map(Number);
const awards = info[1];
const score = input[1].split(' ').map(Number).sort((a,b)=>b-a);

console.log(score[awards-1])