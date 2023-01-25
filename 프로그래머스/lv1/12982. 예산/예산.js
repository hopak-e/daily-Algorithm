function solution(d, budget) {
    var answer = 0;
    d.sort((a,b)=>a-b)
    d.forEach(v=>{
        if(v>budget) return answer;
        budget -= v;
        answer++
    })
    
    return answer;
}