module.exports = function(data){
    var questions = require('../data/question.js');
    var main = require('../main.js');
    var $ = require('jQuery');
    var Handlebars = require('handlebars');
    var newRadioAnswer = require('../../tmpl/admin/newRadioAnswer.html');

    var button = document.getElementById('addAnswer');

    var quiz = questions.questions;

    var answers = [];
    var question = {};

    button.addEventListener('click', function (event) {
        event.preventDefault();
        let answers = document.getElementById('answers');
        let div = document.createElement('div');
        div.innerHTML = Handlebars.compile(newRadioAnswer)({id:answers.childElementCount});
        answers.appendChild(div);
    });

    document.getElementById('newQuestion').addEventListener('submit', function (event) {
        event.preventDefault();
        let questionText = document.getElementById('question').value;
        let answer = $('#answers').find('input[name="answer"]:checked').val();
        let variants = $('#answers').find('input[type="text"]');
        for (let i = 0; i < variants.length; i++){
            let variant = variants[i];
            answers.push(variant.value);
        }

        let question = {
            answer: answer,
            question: questionText,
            variants: answers,
            answer: answer,
            type: 'variant'
        }

        let questions = JSON.parse(localStorage.getItem("questions"));
        questions.push(question);
        localStorage.setItem('questions', JSON.stringify(questions));
        main.renderPage('admin', {});
    })
};
