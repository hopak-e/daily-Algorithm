function solution(k, m, score) {
    let answer = 0;
    score.sort((a,b)=> b-a); 
    let newScore = score.slice(0,score.length-score.length%m)
    for(let i=0; i<newScore.length; i++){
        if((i+1)%m===0) answer+=newScore[i]*m
    }
    return answer;
}