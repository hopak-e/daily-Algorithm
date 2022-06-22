const arr1 = [
  "수성",
  "금성",
  "지구",
  "화성",
  "목성",
  "토성",
  "천왕성",
  "해왕성",
];
const arr2 = [
  "Mercury",
  "Venus",
  "Earth",
  "Mars",
  "Jupiter",
  "Saturn",
  "Uranus",
  "Neptune",
];

function galaxy(str) {
  let isIndex = arr1.indexOf(str);
  let result = arr2[isIndex];
  return result;
}

console.log(galaxy("수성"));
