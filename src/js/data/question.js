var initQuestions = [
    {
        question: "bla bla bla?",
        variants: [
            "variant1",
            "variant2",
            "variant3"
        ],
        answer: 2,
        type: "variant"
    },
    {
        question: "asfgasdgasd?",
        variants: [
            "asdasf",
            "xcv",
            "wer"
        ],
        answer: 0,
        type: "variant"
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
        type: "variant"
    }
];
var questions = localStorage.getItem('questions');
questions = questions ? JSON.parse(questions) : initQuestions;
localStorage.setItem('questions', JSON.stringify(questions));

module.exports = {questions:questions};