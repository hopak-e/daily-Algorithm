function solution(today, terms, privacies) {
  var answer = [];
  const map = {};

  terms.forEach((el) => {
    const term = el.split(" ");
    map[term[0]] = term[1];
  });

  for (let i = 0; i < privacies.length; i++) {
    let privacy = privacies[i].split(" ");
    let period = new Date(privacy[0]);
    let term = map[privacy[1]];
    const newDate = new Date(
      period.setMonth(period.getMonth() + parseInt(term))
    );

    if (newDate <= new Date(today)) {
      answer.push(i + 1);
    }
  }
  return answer;
}