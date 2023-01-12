function solution(t, p) {
    var count = 0;
    var slice = p.length;
    for(let i=0; i<=t.length-slice; i++){
        var answer = t.slice(i,i+slice);
        if(answer <= p){
            count++;
        }
    }
    return count;
}