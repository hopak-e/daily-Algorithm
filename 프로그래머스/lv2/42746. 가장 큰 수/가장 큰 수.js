function solution(numbers) {
    let stringNum = numbers.map(v=>String(v));
    const answer = stringNum.sort((a,b)=>(b+a)-(a+b)).join("");
    
    return answer[0] === "0" ? "0" : answer;
}