function solution(k, dungeons) {
  var answer = [];
  let result = 0;
  const dfs = (num, arr, count) => {
    if (arr.length === 0) return answer.push(count);
    for (let i = 0; i < arr.length; i++) {
      let newNum = count;
      if (num >= arr[i][0] && num >= arr[i][1]) {
        let newArr = [...arr];
        newArr.splice(i, 1);
        newNum++;
        dfs(num - arr[i][1], newArr, newNum);
      } else {
        answer.push(newNum);
      }
    }
  };
  dfs(k, dungeons, 0);
  answer.sort((a, b) => b - a);
  return answer[0];
}