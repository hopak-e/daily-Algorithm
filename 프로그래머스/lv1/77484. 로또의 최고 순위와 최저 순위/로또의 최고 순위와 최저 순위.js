function solution(lottos, win_nums) {
    var answer = [];
    let obj = {6:1, 5:2, 4:3, 3:4, 2:5, 1:6, 0: 6}
    let cnt = 0;
    let result = 0;
    for(let i=0; i<lottos.length; i++){
        if(lottos[i]===0) result++
        for(let j=0; j<win_nums.length; j++){
            if(lottos[i]===win_nums[j]) cnt++
        }
    }
    answer.push(obj[cnt+result], obj[cnt])
    return answer;
}