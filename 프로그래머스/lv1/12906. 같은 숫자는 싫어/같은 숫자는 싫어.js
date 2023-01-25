function solution(arr)
{
    var answer = [];
    let num;
    arr.forEach(el=>{
        if(num!==el){ answer.push(el)
        num = el};
    })
   
    
    return answer;
}