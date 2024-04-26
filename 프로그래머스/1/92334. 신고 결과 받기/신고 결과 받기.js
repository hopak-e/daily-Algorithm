function solution(id_list, report, k) {
  var answer = [];
  const set = new Set(report);
  const newArr = [...set];

  const count = {};
  const map = {};
  newArr.forEach((el) => {
    const [left, right] = el.split(" ");
    count[right] = parseInt(count[right]) + 1 || 1;
  });
  newArr.forEach((el) => {
    const [left, right] = el.split(" ");
    if (count[right] >= k) {
      map[left] = map[left] + 1 || 1;
    }
  });

  id_list.forEach((el) => {
    if (map[el]) {
      answer.push(map[el]);
    } else answer.push(0);
  });
  return answer;
}