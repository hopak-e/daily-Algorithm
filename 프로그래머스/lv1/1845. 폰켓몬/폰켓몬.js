function solution(nums) {
    const newArr = nums.sort((a,b)=>a-b)
    let count = 1;
    let curNum = newArr[0];
    for(let i=0; i<nums.length; i++){
        if(count === nums.length/2) return count;
        if(curNum !== nums[i]){
            count++;
            curNum = nums[i]
        }
    }
    return count
}