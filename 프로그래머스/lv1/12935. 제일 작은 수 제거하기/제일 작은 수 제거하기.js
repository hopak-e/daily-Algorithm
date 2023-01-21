function solution(arr) {
    var answer = [];
    if(arr.length===1) return [-1]
    let min = Math.min(...arr)
    for(let i=0; i<arr.length; i++){
        if(min!==arr[i]) answer.push(arr[i])
    }

    return answer;
}