function solution(n) {
    var answer = 0;
    return  parseInt(n.toString().split("").sort((a,b)=>b-a).join(""));
}