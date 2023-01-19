function solution(k, m, score) {
    //사과 상태 1~k 점 k 최상급 1 최하급 score 배열
    //한 상자 사과 m개 사과 점수 가장 낮은거 p x m
    //최대 이익 계산, 상자 단위로만 판매 남는 사과 버림
    //점수 높은 순으로 한상자씩 담음
    //문자열로 바꿔서 m개로 나눈다
    //m번째 숫자만 뽑아서 *m을 해준다. 그것들을 더해준다.
    let answer = 0;
    score.sort((a,b)=> b-a); 
    let newScore = score.slice(0,score.length-score.length%m)
    for(let i=0; i<newScore.length; i++){
        if((i+1)%m===0) answer+=newScore[i]*m
    }
    return answer;
}