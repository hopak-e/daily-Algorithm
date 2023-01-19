function solution(number, limit, power) {
    // 1~number 
    //각 번호의 약수 개수 
    //limit보다 약수 개수가 크면 power를 사용해야함
    let count = 0;
    let result =0;
    for(let i=1; i<=number; i++){ 
       for(let j=1; j<=Math.sqrt(i); j++){  
           if(j*j===i) count++
           else if(i%j ===0){
               count+=2;
           }
       }
        if(count>limit) result += power;
        else result += count
        count=0;
    }
    return result
}