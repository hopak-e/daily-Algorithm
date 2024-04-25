function solution(n, m, section) {
  var answer = 0;
  let num = 0;
  section.forEach(el=>{
    if(num<el){
        answer++;
        num=el+m-1
    }
  })

  return answer;
}
