function solution(park, routes) {
  let result = [0, 0];
  for (let i = 0; i < park.length; i++) {
    for (let j = 0; j < park[i].length; j++) {
      if (park[i][j] === "S") result = [i, j];
    }
  }

  const dir = {
    E: [0, 1],
    W: [0, -1],
    N: [-1, 0],
    S: [1, 0],
  };

  for (const route of routes) {
    const [left, right] = route.split(" ");
    let move = parseInt(right);
    let [y, x] = result;
    let count = 0;
    while (count < move) {
      x += dir[left][1];
      y += dir[left][0];
      console.log(y, x);
      if (
        x < 0 ||
        x >= park[0].length ||
        y < 0 ||
        y >= park.length ||
        park[y][x] === "X"
      )
        break;
      count++;
    }
    if (count === move) result = [y, x];
  }

  return result;
}