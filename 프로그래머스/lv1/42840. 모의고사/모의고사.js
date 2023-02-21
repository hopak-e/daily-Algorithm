function solution(answers) {
     let answer = [];

    let supo = [
        [1, 2, 3, 4, 5],
        [2, 1, 2, 3, 2, 4, 2, 5],
        [3, 3, 1, 1, 2, 2, 4, 4, 5, 5],
    ];

    let score = [];
    for (let i = 0; i < supo.length; i++) {
        let result = 0;

        for (let j = 0; j < answers.length; j++) {
            supoAnswers = supo[i][j % supo[i].length];

            if (answers[j] === supoAnswers) {
                result++;
            }
        }
        score.push(result);
    }

    for (let i = 0; i < score.length; i++) {
        if (score[i] === Math.max(...score)) {
            answer.push(i + 1);
        }
    }

    return answer;
}