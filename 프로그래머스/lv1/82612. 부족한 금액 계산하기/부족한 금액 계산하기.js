function solution(price, money, count) {
    var answer = 0;
    for(let i=1; i<=count; i++){
        answer += i*price
    }
    if(answer>money) return answer-money
    return 0;
}