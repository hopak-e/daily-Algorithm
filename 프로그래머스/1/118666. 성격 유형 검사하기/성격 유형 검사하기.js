function solution(survey, choices) {
  var answer = "";
  const map = { R: 0, T: 0, C: 0, F: 0, J: 0, M: 0, A: 0, N: 0 };
  for (let i = 0; i < survey.length; i++) {
    const [leftSide, rightSide] = survey[i].split("");
    const result = Math.abs(choices[i] - 4);
    if (choices[i] < 4) {
      map[leftSide] += result;
    } else {
      map[rightSide] += result;
    }
  }
  const mapKey = Object.keys(map);
  for (let i = 0; i < mapKey.length; i += 2) {
    const leftSide = mapKey[i];
    const rightSide = mapKey[i + 1];
    if (map[leftSide] >= map[rightSide]) {
      answer += leftSide;
    } else answer += rightSide;
  }

  return answer;
}