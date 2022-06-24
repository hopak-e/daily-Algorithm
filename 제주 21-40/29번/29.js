const isUpperCase = (e) => {
  if (e === e.toUpperCase()) {
    return true;
  }
  return false;
};

console.log(isUpperCase("GGG"));
