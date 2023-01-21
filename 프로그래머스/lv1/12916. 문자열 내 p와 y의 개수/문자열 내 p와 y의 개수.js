function solution(s){
    var p = 0;
    var y = 0;
    for(let i=0; i<s.length; i++){
      if(s[i].toLowerCase()==="p") p++;
      if(s[i].toLowerCase()==="y") y++;  
    }
    return p===y ? true : false
}