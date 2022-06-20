function twoNumber(num) {
  let arr = num.split(" ");
  let num1 = Number(arr[0]);
  let num2 = Number(arr[1]);
  let result;
  result = `${parseInt(num1 / num2)} ${num1 % num2}`;
  return result;
}

console.log(twoNumber("20 19"));
