var users = require('../data/users.js');
var router = require('../router.js');


function findUser(name) {
    for (var i = 0; i < users.length; i++){
        var user = users[i];
        if (user.name === name){
            return user;
        }
    }
}

function checkPassword(user, pass) {
    return user.pass === pass;
}

module.exports = function(data){

    var form = document.getElementById('form');

    form.addEventListener('submit', function (event) {
        var router = require('../router.js');
        event.preventDefault();
        var name = document.getElementById('name').value;
        var pass = document.getElementById('pass').value;
        var text;
        var logged = false;

        var user = findUser(name);
        if (user) {
            if (checkPassword(user, pass)){
                text = 'Success';
                logged = true;
            } else {
                text = 'Wrong password';
            }
        } else {
            text = 'User not found';
        }

        if (!logged) {
            router.renderPage('login', {text: text});
        } else {
          if (user.role === 'admin') {
              router.renderPage('admin', {});
          } else {
              router.renderPage('home', {user: user});
          }
        }
    })
};
