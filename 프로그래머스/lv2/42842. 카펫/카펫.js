function solution(brown, yellow) {
  var answer = [];
  let totalCnt = brown + yellow;
  for (let i = totalCnt; i >= 0; i--) {
    if (totalCnt % i === 0 && yellow % (i - 2) === 0) {
      answer = [i, totalCnt / i];
      break;
    }
  }
  return answer;
}