function solution(s) {
    if(s.includes('e')) return false
    if(s.length===4|| s.length===6){
        return !isNaN(s) 
    } else return false

}