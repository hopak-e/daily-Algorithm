function solution(sizes) {
    var max = Math.max(sizes[0][0],sizes[0][1]);
    var minmax = Math.min(sizes[0][0],sizes[0][1]);
    for(let i=0; i<sizes.length; i++){
        if(Math.max(sizes[i][0],sizes[i][1])>max) {
            max = Math.max(sizes[i][0],sizes[i][1])
            
        }
        if(Math.min(sizes[i][0],sizes[i][1])>minmax){
           minmax = Math.min(sizes[i][0],sizes[i][1])
           }
    }
    return max*minmax;
}