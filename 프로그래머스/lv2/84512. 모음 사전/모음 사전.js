function solution(word) {
  let idx = 0;
  const obj = {};
  const vowels = [..."AEIOU"];

  const dfs = (words) => {
    if (words.length > 5) return;
    obj[words] = idx++;
    vowels.forEach((vowel) => {
      dfs(words + vowel);
    });
  };
  dfs("");
  return obj[word];
}