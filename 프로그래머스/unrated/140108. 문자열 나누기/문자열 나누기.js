function solution(s) {
    var count = 0;
    var answer = 0;
    var result = 0;
    var str = ""
    for(let i=0; i<s.length; i++){
        //abracadabra
        if(!str){
            str = s[i];
        }
        if(str!==s[i])
            answer++;
         else {
            count++;
        }
       if(count===answer){
            result++;
            count =0;
            answer=0;
            str = "";
        }
   
    }
     if(str) result++;
    return result;
}