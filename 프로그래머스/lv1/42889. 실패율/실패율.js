function solution(N, stages) {
    var answer = [];
    let people = stages.length;
    for(let i=1; i<=N; i++){
        let temp = stages.filter(el=>el===i).length;
        answer.push([i, temp/people])
        people -=temp
    }
    answer = answer.sort((a,b)=>b[1]-a[1])
    return answer.map(a=>a[0]);
}