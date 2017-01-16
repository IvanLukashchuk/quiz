var $ = require('jquery');

function checkAnswer(question, index) {
    switch (question.type){
        case "radio":
            let val = $('#question_' + index).find('input[name="answer"]:checked').val();
            return val == question.answer;
        case "checkbox":
            val = $('#question_' + index).find('input[name="answer"]:checked');
            let count = 0;
            for (let i = 0; i < val.length; i++) {
                let variant = val[i];
                if (question.answer.includes(variant.value)){
                    count++;
                } else {
                    return false;
                }
            }
            return question.answer.length == count;
        case "input":
            val = $('#question_' + index).find('input[name="answer"]').val();
            for (let i = 0; i < question.answer.length; i++) {
                let correct = question.answer[i];
                if (val === correct){
                    return true;
                }
            }
            return false;
    }
}

function updateResult(data, counter, quiz) {
    let admin = JSON.parse(localStorage.getItem('admin'));
    let user;
    for (let i = 0; i < admin.users.length; i++) {
        user = admin.users[i];
        if (data.user.name === user.name) {
            break;
        }
    }
    user.result = counter + '/' + quiz.length;
    localStorage.setItem('admin', JSON.stringify(admin));
}

module.exports = function(data){
    var quiz = JSON.parse(localStorage.getItem('questions'));
    var router = require('../router');

    var position = 0;

    document.getElementById('endTest').addEventListener('click', function (event) {
        let counter = 0;
        for (let i = 0; i < quiz.length; i++){
            if (checkAnswer(quiz[i], i)){
                counter++;
            }
        }
        router.renderPage('result', {result:counter, count:quiz.length});

        updateResult(data, counter, quiz);
    })

    $('#question_' + position).get(0).hidden = false;

    $('#next').click((event) =>{
        if (position >= quiz.length - 1) return;
        $('#question_' + position).get(0).hidden = true;
        position++;
        $('#question_' + position).get(0).hidden = false;
    })

    $('#back').click((event) =>{
        if (position <= 0) return;
        $('#question_' + position).get(0).hidden = true;
        position--;
        $('#question_' + position).get(0).hidden = false;
    })
};
