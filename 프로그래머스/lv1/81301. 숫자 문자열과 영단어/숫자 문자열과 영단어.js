function solution(s) {
  const Eng = [
    "zero",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
    "ten",
  ];

  var answer = s;

  for (let i = 0; i < Eng.length; i++) {
    if (answer.includes(Eng[i])) {
           answer = answer.replace(new RegExp(Eng[i], "g"), i);
    }
  }
  return parseInt(answer);
}