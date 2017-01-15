var loginPage = require('../tmpl/login-form.html');
var adminPage = require('../tmpl/admin/admin.html');
var quizPage = require('../tmpl/question.html');
var loginController = require('./pages/login.js');
var quizController = require('./pages/quiz');
// var Mustache = require('mustache');
import Handlebars from 'handlebars';
import $ from 'jquery';

function addHandlebarsHandlers() {
    Handlebars.registerHelper("inc", function (value, options) {
        return parseInt(value) + 1;
    });

    Handlebars.registerHelper('ifCond', function (v1, v2, options) {
        if (v1 === v2) {
            return options.fn(this);
        }
        return options.inverse(this);
    });
}

addHandlebarsHandlers();

console.log('MainJS');

var config = {
  'login': {
    template: loginPage,
    controller: loginController
  }
  ,'home': {
    template: quizPage,
    controller: quizController,
    data: require('./data/question')
  }
  ,'admin': {
    template: adminPage,
    controller: function(){},
    data : {users:require('./data/users.js')}
  }
  ,'result': {
    template: require('../tmpl/result.html'),
    controller: function(){}
  }
  ,'newRadioQuestion': {
    template: require('../tmpl/admin/newQuestion.html'),
    controller: require('./pages/newQuestion'),
    data: {template: require('../tmpl/admin/newRadioAnswer.html')}
  }
  ,'newCheckboxQuestion': {
    template: require('../tmpl/admin/newQuestion.html'),
    controller: require('./pages/newQuestion'),
    data: {template: require('../tmpl/admin/newCheckboxAnswer.html')}
  }
  ,'newInputQuestion': {
    template: require('../tmpl/admin/newQuestion.html'),
    controller: require('./pages/newQuestion'),
    data: {template: require('../tmpl/admin/newInputAnswer.html')}
  }
};

function _prepareData(page, data) {
    var storedData = config[page].data;
    var loadedData = JSON.parse(localStorage.getItem(page));
    storedData = storedData ? storedData : {};
    $.extend(true, storedData, loadedData);
    $.extend(true, storedData, data);
    localStorage.setItem(page, JSON.stringify(storedData));
    return storedData;
}

function renderPage(page, data){
    page = config[page] ? page : 'login'
    var storedData = _prepareData(page, data);
    var main = document.getElementById('page');
    var pageToRender = config[page].template;
    main.innerHTML = Handlebars.compile(pageToRender)(storedData);
    config[page].controller(storedData);

    window.location.hash = page;
    addLinkHandler();
}

function addLinkHandler() {
    let as = $('a[href]');
    for (let i = 0; i < as.length; i++) {
        let a = as[i];
        a.onclick = (event) => {
            event.preventDefault();
            renderPage(event.target.href.substr(event.target.href.lastIndexOf('#') + 1), {});
        }
    }
}

module.exports = {
  renderPage: renderPage
};
