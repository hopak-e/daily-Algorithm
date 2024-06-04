let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input.shift());
const arr = input.map((v) => v.split(" ").map(Number));

function getScore(team) {
  let score = 0;
  for (let i = 0; i < team.length; i++) {
    for (let j = i + 1; j < team.length; j++) {
      score += arr[team[i]][team[j]] + arr[team[j]][team[i]];
    }
  }
  return score;
}

function getMinDiff() {
  const members = Array.from({ length: N }, (_, i) => i);
  let minDiff = Infinity;

  function dfs(start, team) {
    if (team.length >= 1 && team.length < N) {
      const otherTeam = members.filter((mem) => !team.includes(mem));
      const teamScore = getScore(team);
      const otherTeamScore = getScore(otherTeam);
      const diff = Math.abs(otherTeamScore - teamScore);
      minDiff = Math.min(minDiff, diff);
    }
    for (let i = start; i < N; i++) {
      team.push(i);
      dfs(i + 1, team);
      team.pop();
    }
  }
  dfs(0, []);
  return minDiff;
}
console.log(getMinDiff());