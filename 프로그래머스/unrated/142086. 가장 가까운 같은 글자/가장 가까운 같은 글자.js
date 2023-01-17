function solution(s) {
    // banana
    var answer = [];
    for(let i=0; i<s.length; i++){
        var str = s[i]
        if(s.indexOf(s[i])===i){
            answer.push(-1)
        }
     for(let j=i-1; j>=0; j--){
         if(s[j] === str){
             answer.push(i-j)
             break;
         }
     }
    }
    return answer;
}