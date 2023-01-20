function solution(ingredient) {
    const arr = [];
    let count = 0;
    
    ingredient.forEach((num)=>{
        arr.push(num);  
       
        if(arr.length >= 4){
            const find = arr.slice(-4).join('');
            if(find === '1231'){
                arr.pop();
                arr.pop();
                arr.pop();
                arr.pop();   
                count++;
            }
        } 
    })
    
    return count;
}