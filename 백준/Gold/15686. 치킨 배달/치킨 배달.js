let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const [N, M] = input[0].split(" ").map(Number);
const arr = input.slice(1).map((v) => v.split(" ").map(Number));

const city = [];
const homes = [];
const chickens = [];

for (let i = 0; i < N; i++) {
  city.push(arr[i]);
  for (let j = 0; j < N; j++) {
    if (arr[i][j] === 1) homes.push([i, j]);
    if (arr[i][j] === 2) chickens.push([i, j]);
  }
}

const getChickenDistance = (homes, chickens) => {
  let totalDist = 0;
  for (const [hy, hx] of homes) {
    let minDist = Infinity;
    for (const [cy, cx] of chickens) {
      const dist = Math.abs(hy - cy) + Math.abs(hx - cx);
      minDist = Math.min(minDist, dist);
    }
    totalDist += minDist;
  }
  return totalDist;
};

const getCombination = (arr, number) => {
  const result = [];
  if (number === 1) return arr.map((el) => [el]);
  arr.forEach((fixed, index, origin) => {
    const rest = origin.slice(index + 1);
    const combinations = getCombination(rest, number - 1);
    const attached = combinations.map((comb) => [fixed, ...comb]);
    result.push(...attached);
  });
  return result;
};
const chickenCombination = getCombination(chickens, M);
let minCityChickenDist = Infinity;

for (const comb of chickenCombination) {
  const current = getChickenDistance(homes, comb);
  minCityChickenDist = Math.min(minCityChickenDist, current);
}

console.log(minCityChickenDist);
