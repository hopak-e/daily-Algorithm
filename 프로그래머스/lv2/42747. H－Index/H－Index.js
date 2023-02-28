function solution(citations) {
    var answer = 0;

    for(let i=citations.length; i>=0; i--){
        //3210
        for(let j=0; j<citations.length; j++){
            if(citations[j]>=i) answer++;
            //[0,1,1]
            //xxx1
        }
        if(answer>=i) {answer=i; break};
        answer = 0;
    }
    return answer;
}