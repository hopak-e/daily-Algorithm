function solution(friends, gifts) {
  var answer = 0;
  let N = friends.length;
  const map = new Map();
  const table = Array.from({ length: N }).map(() => new Array(N).fill(0));
  const rank = new Array(N).fill(0);
  const takeGift = new Array(N).fill(0);

  friends.forEach((el, idx) => {
    map.set(el, idx);
  });
  gifts.forEach((el) => {
    const [from, to] = el.split(" ");
    table[map.get(from)][map.get(to)]++;
  });

  for (let i = 0; i < N; i++) {
    rank[i] = table[i].reduce((a, b) => a + b, 0);
    for (let j = 0; j < N; j++) {
      rank[i] -= table[j][i];
    }
  }

  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      if (i === j) continue;
      if (table[i][j] > table[j][i]) takeGift[i]++;
      if (table[i][j] < table[j][i]) takeGift[j]++;
      if (table[i][j] === table[j][i]) {
        if (rank[i] > rank[j]) takeGift[i]++;
        if (rank[i] < rank[j]) takeGift[j]++;
      }
    }
  }

  return Math.max(...takeGift);
}