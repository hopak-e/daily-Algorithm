//랜덤 숫자 말하고 3의 배수면 박수 아니면 숫자 말하기
// 랜덤 n 3의 배수면 짝 3의 배수가 아니라면 n 출력
let result = "";
const newNum = function (n) {
  if (n % 3 === 0) {
    result = "짝";
  } else {
    result = "n";
  }
  return result;
};
console.log(newNum(3));
