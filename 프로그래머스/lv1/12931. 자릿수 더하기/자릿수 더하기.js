function solution(n)
{
    var arr = String(n).split("");
    
    return arr.reduce((acc,cur)=>acc+Number(cur),0);
}