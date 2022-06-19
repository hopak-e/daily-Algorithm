function sqrt(num) {
  let newNum = num.split(" ");
  let num1 = Number(newNum[0]);
  let num2 = Number(newNum[1]);
  return Math.pow(num1, num2);
}

console.log(sqrt("2 4"));
