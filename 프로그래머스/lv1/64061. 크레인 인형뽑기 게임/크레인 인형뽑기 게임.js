function solution(board, moves) {
  var answer = 0;
  let result = [];

  for (let i = 0; i < moves.length; i++) {
    let idx = moves[i] - 1;
    let prev = result[result.length - 1];
    for (let j = 0; j < board.length; j++) {
      if (board[j][idx] === 0) {
        continue;
      } else {
        if (prev === board[j][idx]) {
          result.pop();
          answer += 2;
        } else {
          result.push(board[j][idx]);
        }
        board[j][idx] = 0;
        break;
      }
    }
  }

  return answer;
}