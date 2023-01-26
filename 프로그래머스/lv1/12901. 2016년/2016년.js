function solution(a, b) {
    const day = ["SUN","MON","TUE","WED","THU","FRI","SAT"]
    var answer = new Date(2016,a-1,b).getDay()
    return day[answer];
}