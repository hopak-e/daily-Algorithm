function solution(players, callings) {
  const map = {};
  players.forEach((player, idx) => {
    map[player] = idx;
  });
  callings.map((el) => {
    const idx = map[el];
    const temp = players[idx - 1];

    players[idx] = temp;
    players[idx - 1] = el;

    map[el] = idx - 1;
    map[temp] = idx;
  });
  return players;
}