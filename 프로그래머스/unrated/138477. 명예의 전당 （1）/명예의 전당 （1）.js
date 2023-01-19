function solution(k, score) {

    let answer = [];
    let result = [];

    score.forEach((num)=>{
        answer.push(num);
        answer.sort((a,b)=>b-a);
        
        if(answer.length<=k){
            result.push(answer[answer.length-1])
        } else {
            result.push(answer[k-1])
        }
    })
    
    
    return result;
}