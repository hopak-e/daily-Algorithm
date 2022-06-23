let obj = {};

const mathScore = (el, val) => {
  const keys = el.split(" ");
  const values = val.split(" ");
  for (let i = 0; i < keys.length; i++) {
    obj[keys[i]] = parseInt(values[i]);
  }
  return obj;
};

console.log(mathScore("asdf asd", "10 20"));
