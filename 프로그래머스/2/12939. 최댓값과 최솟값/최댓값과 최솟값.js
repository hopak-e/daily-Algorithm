function solution(s) {
  var answer = "";
  const num = s.split(" ");
  const minNum = Math.min(...num);
  const maxNum = Math.max(...num);
  answer = minNum + " " + maxNum;
  return answer;
}