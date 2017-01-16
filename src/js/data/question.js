module.exports = function () {
    var initQuestions = [
        {
            question: "Some radio question",
            variants: [
                "variant 1",
                "variant 2",
                "variant 3 correct"
            ],
            answer: 2,
            type: "radio"
        },
        {
            question: "Some checkbox question?",
            variants: [
                "correct",
                "correct",
                "incorrect"
            ],
            answer: ["0", "1"],
            type: "checkbox"
        },
        {
            question: "Some input question? answer: answer",
            answer: ["answer", "ANSWER"],
            type: "input"
        }
    ];
    var questions = localStorage.getItem('questions');
    questions = questions ? JSON.parse(questions) : initQuestions;
    localStorage.setItem('questions', JSON.stringify(questions));
    return {questions};
}