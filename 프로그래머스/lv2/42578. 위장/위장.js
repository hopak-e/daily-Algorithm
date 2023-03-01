function solution(clothes) {
    var answer = 1;
    const map = new Map();
    for(let i=0; i<clothes.length; i++){
        let category = clothes[i][1]
        map.set(category, (map.get(category)||0)+1)
    }
    for(let [k,v] of map){
        answer*=v+1
    }
    return answer-1;
}