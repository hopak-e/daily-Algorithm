function solution(arr) {
    let result =arr.reduce((acc,cur)=>acc+cur,0)/arr.length
    return result;
}