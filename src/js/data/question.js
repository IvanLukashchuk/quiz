var initQuestions = [
    {
        question: "bla bla bla?",
        variants: [
            "variant1",
            "variant2",
            "variant3"
        ],
        answer: 2,
        type: "radio"
    },
    {
        question: "asfgasdgasd?",
        variants: [
            "asdasf",
            "xcv",
            "wer"
        ],
        answer: 0,
        type: "radio"
    },
    {
        question: "qqqqqqq?",
        variants: [
            "asd",
            "zxc",
            "qwe",
            "sdf"
        ],
        answer: 3,
        type: "radio"
    }
];
var questions = localStorage.getItem('questions');
questions = questions ? JSON.parse(questions) : initQuestions;
localStorage.setItem('questions', JSON.stringify(questions));

module.exports = {questions:questions};