var $ = require('jquery');

function addAnswer(event, template) {
    event.preventDefault();
    var Handlebars = require('handlebars');
    let answers = document.getElementById('answers');
    let div = document.createElement('div');
    div.innerHTML = Handlebars.compile(template)({id: answers.childElementCount});
    answers.appendChild(div);
};

function saveQuestion(question) {
    let questions = JSON.parse(localStorage.getItem("questions"));
    questions.push(question);
    localStorage.setItem('questions', JSON.stringify(questions));
}

function createRadioQuestion() {
    let answers = [];
    let questionText = document.getElementById('question').value;
    let answer = $('#answers').find('input[name="answer"]:checked').val();
    let variants = $('#answers').find('input[type="text"]');
    for (let i = 0; i < variants.length; i++) {
        let variant = variants[i];
        answers.push(variant.value);
    }

    let question = {
        question: questionText,
        variants: answers,
        answer: answer,
        type: 'radio'
    }
    return question;
}

function createCheckboxQuestion() {
    let answers = [];
    let correct = [];
    let questionText = document.getElementById('question').value;
    let answer = $('#answers').find('input[name="answer"]:checked');
    let variants = $('#answers').find('input[type="text"]');
    for (let i = 0; i < variants.length; i++) {
        let variant = variants[i];
        answers.push(variant.value);
    }
    for (let i = 0; i < answer.length; i++) {
        let variant = answer[i];
        correct.push(variant.value);
    }

    let question = {
        question: questionText,
        variants: answers,
        answer: correct,
        type: 'checkbox'
    }
    return question;
}

function createInputQuestion() {
    let answers = [];
    let questionText = document.getElementById('question').value;
    let variants = $('#answers').find('input[type="text"]');
    for (let i = 0; i < variants.length; i++) {
        let variant = variants[i];
        answers.push(variant.value);
    }

    let question = {
        question: questionText,
        answer: answers,
        type: 'input'
    }
    return question;
}

function createQuestion(hash) {
    switch (hash){
        case "#newRadioQuestion": return createRadioQuestion();
        case "#newCheckboxQuestion": return createCheckboxQuestion();
        case "#newInputQuestion": return createInputQuestion();
    }
}

module.exports = function(data){
    var questions = require('../data/question.js');
    var router = require('../router.js');
    var button = document.getElementById('addAnswer');

    function addAnswerFunction(template){
        return (event) => addAnswer(event, template)
    }
    button.addEventListener('click', addAnswerFunction(data.template))

    document.getElementById('newQuestion').addEventListener('submit', function (event) {
        event.preventDefault();
        let question = createQuestion(window.location.hash);

        saveQuestion(question);
        router.renderPage('admin', {});
    })
};
