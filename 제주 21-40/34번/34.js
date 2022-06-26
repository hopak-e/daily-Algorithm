const sort = (e) => {
  sorted = e
    .split(" ")
    .sort((a, b) => {
      return a - b;
    })
    .join(" ");
  if (e === sorted) {
    console.log("YES");
  } else {
    console.log("NO");
  }
};

sort("1 2 3 4 5");
sort("1 3 2 4 5");
