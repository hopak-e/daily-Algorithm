function solution(s, skip, index) {
  var answer = "";
  const arr = s.split("");

  arr.map((el) => {
    let char = el.charCodeAt();
    for (let i = 0; i < index; i++) {
      char++;
      if (char > 122) {
        char = 97;
      }
      while (skip.includes(String.fromCharCode(char))) {
        char++;
        if (char > 122) {
          char = 97;
        }
      }
    }
    answer += String.fromCharCode(char);
  });

  return answer;
}