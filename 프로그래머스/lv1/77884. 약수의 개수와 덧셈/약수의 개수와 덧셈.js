function solution(left, right) {
    var answer = 0;
    for(let i=left; i<=right; i++){
        let num = 0;
        for(let j=1; j<=Math.sqrt(i); j++){
            if(j*j===i) num++;
            else if(i%j===0) num+=2;
        }
            if(num%2===0) answer+=i
            else if(num%2===1) answer-=i
    }
    return answer;
}