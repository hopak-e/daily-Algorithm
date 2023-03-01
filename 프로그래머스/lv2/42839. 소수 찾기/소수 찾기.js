function solution(numbers) {
  var answer = [];
  let nums = numbers.split("");

  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  const dfs = (arr, str) => {
    if (arr.length >= 1) {
      for (let i = 0; i < arr.length; i++) {
        let newNum = str + arr[i];
        let newArr = [...arr];
        newArr.splice(i, 1);
        if (!answer.includes(+newNum) && isPrime(+newNum)) answer.push(+newNum);
        dfs(newArr, newNum);
      }
    }
  };

  dfs(nums, "");

  return answer.length;
}