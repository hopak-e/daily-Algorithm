function solution(bandage, health, attacks) {
  let hp = health;
  let length = attacks[attacks.length - 1][0];
  let count = 0;
  let map = {};
  attacks.forEach((el) => {
    map[el[0]] = el[1];
  });

  for (let i = 1; i <= length; i++) {
    if (map[i]) {
      hp -= map[i];
      count = 0;
    } else {
      if (hp < health) hp += bandage[1];
      count++;
      if (count === bandage[0]) {
        hp += bandage[2];
        count = 0;
      }
    }
    if (hp > health) hp = health;
    if (hp < 0) {
      break;
    }
  }
  return hp > 0 ? hp : -1;
}