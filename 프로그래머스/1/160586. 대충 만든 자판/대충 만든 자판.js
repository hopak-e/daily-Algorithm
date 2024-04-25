function solution(keymap, targets) {
  var answer = [];
  const map = new Map();
  for (let i = 0; i < keymap.length; i++) {
    for (let j = 0; j < keymap[i].length; j++) {
      if (!map.has(keymap[i][j])) {
        map.set(keymap[i][j], j + 1);
      } else {
        map.set(
          keymap[i][j],
          j < map.get(keymap[i][j]) ? j + 1 : map.get(keymap[i][j])
        );
      }
    }
  }

  for (let i = 0; i < targets.length; i++) {
    let num = 0;
    for (let j = 0; j < targets[i].length; j++) {
      if (!map.has(targets[i][j])) {
        num = -1;
        break;
      } else {
        num += map.get(targets[i][j]);
      }
    }
    answer.push(num);
  }
  return answer;
}