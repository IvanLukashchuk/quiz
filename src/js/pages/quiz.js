module.exports = function(data){

    var questions = require('../data/question.js');
    var main = require('../main.js');
    var $ = require('jQuery');

    var button = document.getElementById('endTest');

    var quiz = questions.questions;

    button.addEventListener('click', function (event) {
        let counter = 0;
        for (let i = 0; i < quiz.length; i++){
            let form = document.getElementById('question_' + i);
            let val = $('#question_' + i).find('input[name="answer"]:checked').val();
            if (val == quiz[i].answer){
                counter++;
            }
        }
       main.renderPage('result', {result:counter, count:quiz.length});
    })
};
