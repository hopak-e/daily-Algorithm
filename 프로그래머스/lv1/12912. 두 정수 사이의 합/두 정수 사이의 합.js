function solution(a, b) {
    let answer=0;
    if(b>=a){
    for(let i=a; i<=b; i++){
        answer+=i
    }} 
    else if(b<a){
     for(let i=a; i>=b; i--){
        answer+=i
        }
    }
    return answer;
}