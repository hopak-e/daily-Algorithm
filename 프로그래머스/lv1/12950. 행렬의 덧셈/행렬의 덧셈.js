function solution(arr1, arr2) {
    var answer = [];
    for(let i=0; i<arr1.length; i++){
        let newArr = [];
        for(let j=0; j<arr1[i].length; j++){
            newArr.push(parseInt(arr1[i][j]+arr2[i][j]))
        }
        answer.push(newArr)
    }
    return answer;
}