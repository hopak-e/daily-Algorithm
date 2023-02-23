function solution(cards1, cards2, goal) {
    var answer = '';
    let pack1 = 0;
    let pack2 = 0;
    for(let i=0; i<goal.length; i++){
        if(goal[i]===cards1[pack1]){
            pack1++;
        } else if(goal[i]===cards2[pack2]){
            pack2++;
        } else return "No"
    }
    
    return pack1+pack2===goal.length ? "Yes" : "No";
}