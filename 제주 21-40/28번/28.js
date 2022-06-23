const twoGram = (e) => {
  let str = e.split("");
  let result = "";
  for (let i = 0; i < str.length - 1; i++) {
    result = result + `${str[i]} ${str[i + 1]} \n`;
  }
  return result;
};

console.log(twoGram("Javascript"));
