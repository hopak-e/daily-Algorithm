function solution(n) {
    var answer = 0;
    if(n===0) return 0;
    if(n===1) return 1;
    for(let i=1; i<=Math.sqrt(n); i++){
        if(i*i===n) answer += i
        else if(n%i===0){
            answer += i+(n/i)
        }
    }
    return answer;
}