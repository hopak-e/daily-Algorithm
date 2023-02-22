function solution(X, Y) {
  var answer = "";
X = X.split("");
  Y = Y.split("");

 for(let i=0; i<10; i++){
     let curX = X.filter(v=>i===Number(v)).length
     let curY = Y.filter(v=>i===Number(v)).length
     answer += String(i).repeat(Math.min(curX,curY))
 }
    
  if (answer==="") return "-1";
  if(Number(answer) === 0) return "0"
  return answer.split("").sort((a,b)=>Number(b)-Number(a)).join("");
}