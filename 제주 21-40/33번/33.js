const reverse = (e) => {
  let num = e.split(" ").reverse();
  let result = "";
  for (let i = 0; i < num.length; i++) {
    result += `${num[i]} `;
  }
  return console.log(result.slice(0, -1));
};

reverse("1 2 3 4 5");
