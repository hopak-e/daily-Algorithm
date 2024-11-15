let input = require("fs")
  .readFileSync(process.platform === "linux" ? "/dev/stdin" : "./input.txt")
  .toString()
  .trim();
// .split("\n");

function solve(input) {
  const MOD = 1000000;

  if (input[0] === "0") {
    console.log(0);
    return;
  }

  const n = input.length;
  const dp = Array(n + 1).fill(0);

  dp[0] = 1; 
  dp[1] = 1; 
  for (let i = 2; i <= n; i++) {
    const oneDigit = Number(input[i - 1]);
    const twoDigits = Number(input.slice(i - 2, i)); 
    
    if (oneDigit >= 1 && oneDigit <= 9) {
      dp[i] = (dp[i] + dp[i - 1]) % MOD;
    }

    
    if (twoDigits >= 10 && twoDigits <= 26) {
      dp[i] = (dp[i] + dp[i - 2]) % MOD;
    }
  }

  console.log(dp[n]);
}

solve(input);
