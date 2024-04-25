function solution(today, terms, privacies) {
  var answer = [];
  let [year, month, day] = today.split(".").map(Number);
  let todates = year * 12 * 28 + month * 28 + day;

  let term = {};
  terms.forEach((el) => {
    const [left, right] = el.split(" ");
    term[left] = Number(right);
  });

  privacies.forEach((el, idx) => {
    const [left, right] = el.split(" ");
    const due = left.split(".").map(Number);
    const dueDates = due[0] * 12 * 28 + due[1] * 28 + term[right] * 28 + due[2];
    if (dueDates <= todates) {
      answer.push(idx + 1);
    }
  });
  return answer;
}