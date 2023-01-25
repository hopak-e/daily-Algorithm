function solution(s, n) {
    var answer = '';
    for(let i=0; i<s.length; i++){
        let char;
        if(s[i]===" ")  answer += " ";
        char = s.charCodeAt(i)
     
        if(char>=65 && char<=90 ) {
            if(char+n>90)answer+= String.fromCharCode(n+char-26)
            else answer+= String.fromCharCode(char+n)
        }
        else if(char>=97 && char<=122){
         if(char+n>122) answer+= String.fromCharCode(n+char-26)
            else answer+= String.fromCharCode(char+n)
        }
    }
    return answer;
}