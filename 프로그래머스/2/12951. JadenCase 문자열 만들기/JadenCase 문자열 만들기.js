function solution(s) {
  var answer = "";
  let result = s
    .split(" ")
    .map((el) => el.charAt(0).toUpperCase() + el.slice(1).toLowerCase());
  answer = result.join(" ");
  return answer;
}