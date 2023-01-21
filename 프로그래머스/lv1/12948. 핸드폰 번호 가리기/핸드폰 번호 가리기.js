function solution(phone_number) {
    let answer = '';
    const length = phone_number.length;
    const num = phone_number.slice(length-4,length)
    answer = ("*").repeat(length-4)
    return answer+num;
}