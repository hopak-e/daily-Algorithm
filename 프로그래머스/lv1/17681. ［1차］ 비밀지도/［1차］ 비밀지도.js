function solution(n, arr1, arr2) {
  var answer = [];

  for (let i = 0; i < n; i++) {
    let result = "";
    let num1 = arr1[i].toString(2);
    let num2 = arr2[i].toString(2);
    if (num1.length < n) num1 = "0".repeat(n - num1.length) + num1;
    if (num2.length < n) num2 = "0".repeat(n - num2.length) + num2;
    for (let j = 0; j < n; j++) {
      if (num1[j] === "0" && num2[j] === "0") result += " ";
      else result += "#";
    }
      answer.push(result);

  }
  return answer;
}