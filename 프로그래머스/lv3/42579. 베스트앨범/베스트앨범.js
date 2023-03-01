function solution(genres, plays) {
  var answer = [];
  let genreCnt = {};

  for (let i = 0; i < genres.length; i++) {
    genreCnt[genres[i]] = genreCnt[genres[i]]
      ? genreCnt[genres[i]] + plays[i]
      : plays[i];
  }
  let valueCnt = Object.entries(genreCnt);
  valueCnt.sort((a, b) => b[1] - a[1]);

  let allValue = genres.map((el, idx) => ({
    genre: el,
    idx,
    play: plays[idx],
  }));

  for (let i = 0; i < valueCnt.length; i++) {
    let cnt = [];
    for (let j = 0; j < allValue.length; j++) {
      if (valueCnt[i][0] === allValue[j].genre) cnt.push(allValue[j]);
    }
    cnt.sort((a, b) => b.play - a.play);
    for (let k = 0; k <= 1; k++) {
      cnt[k] && answer.push(cnt[k].idx);
    }
  }

  return answer
}