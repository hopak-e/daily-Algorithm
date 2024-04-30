const fs = require('fs');
const input = fs.readFileSync('/dev/stdin').toString().trim().split(' ');

let N = Number(input[0]);
let M = Number(input[1]);
let isPrimeNumber = Array(M + 1).fill(true);
isPrimeNumber[0] = isPrimeNumber[1] = false; 

function result() {
  for (let i = 2; i <= Math.ceil(Math.sqrt(M)); i++) {
    if(isPrimeNumber[i]) {
      let m = 2; 
      while(i * m <= M) { 
        isPrimeNumber[i * m] = false;
        m++;
      }
    }
  }
  
  const results = []; 
  for(let i = N; i <= M; i++) { 
    if(isPrimeNumber[i]) { 
		results.push(i);
    }
  }
  console.log(results.join('\n'));
}

result();