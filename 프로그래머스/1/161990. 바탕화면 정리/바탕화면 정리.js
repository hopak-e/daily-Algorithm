function solution(wallpaper) {
  var answer = [];
  let minX = Number.MAX_SAFE_INTEGER;
  let maxX = 0;
  let minY = Number.MAX_SAFE_INTEGER;
  let maxY = 0;
  for (let i = 0; i < wallpaper.length; i++) {
    if (wallpaper[i].split("").includes("#")) {
      const firstIndex = wallpaper[i].indexOf("#");
      const lastIndex = wallpaper[i].lastIndexOf("#");
      if (minX > firstIndex) {
        minX = firstIndex;
      }
      if (minY > i) {
        minY = i;
      }
      if (maxX < lastIndex) {
        maxX = lastIndex;
      }
      if (maxY < i) {
        maxY = i;
      }
    }
    answer = [minY, minX, maxY + 1, maxX + 1];
  }
  return answer;
}