function gugu(num) {
  let result = "";
  for (let i = 1; i <= 9; i++) {
    result = result + num * i + " ";
  }
  return result;
}

console.log(gugu("2"));
