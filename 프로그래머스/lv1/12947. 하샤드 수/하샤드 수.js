function solution(x) {
    return x%x.toString().split("").reduce((a,b)=>a+parseInt(b),0)===0
}