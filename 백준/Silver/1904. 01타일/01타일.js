let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim()
  .split("\n");

const N = Number(input[0]);

const MOD = 15746;

const solution = (N) => {
  if (N === 1) return 1;
  if (N === 2) return 2;

  let dp1 = 1;
  let dp2 = 2;

  for (let i = 3; i <= N; i++) {
    const cur = (dp1 + dp2) % MOD;
    dp1 = dp2;
    dp2 = cur;
  }

  return dp2;
};

console.log(solution(N));
