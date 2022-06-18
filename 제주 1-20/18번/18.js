//평균 구하기

function newNum(num) {
  let arr = num.split(" ");
  let result = 0;
  for (let i = 0; i < arr.length; i++) {
    result = result + arr[i];
  }
  return result / arr.length;
}

console.log(newNum(10));
