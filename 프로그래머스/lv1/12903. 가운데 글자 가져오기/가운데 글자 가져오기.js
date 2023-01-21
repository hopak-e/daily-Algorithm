function solution(s) {
    var answer = '';
    if(s.length%2===1) return s[(s.length+1)/2-1]
    else {
        return s[Math.floor((s.length+1)/2-1)]+s[Math.floor((s.length+1)/2)]
    }
    return answer;
}