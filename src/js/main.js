var loginPage = require('../tmpl/login-form.html');
var adminPage = require('../tmpl/admin/admin.html');
var homePage = require('../tmpl/home.html');
var quizPage = require('../tmpl/question.html');
var loginController = require('./pages/login.js');
var quizController = require('./pages/quiz');
// var Mustache = require('mustache');
import Handlebars from 'handlebars';
import $ from 'jquery';

console.log('MainJS');

var config = {
  'login': {
    template: loginPage,
    controller: loginController,
    location: 'login'
  }
  ,'home': {
    template: quizPage,
    controller: quizController,
    location: 'home',
    data: require('./data/question')
  }
  ,'admin': {
    template: adminPage,
    controller: function(){},
    location: 'admin'
  }
  ,'result': {
    template: require('../tmpl/result.html'),
    controller: function(){},
    location: 'result'
  }
  ,'newQuestion': {
    template: require('../tmpl/admin/newQuestion.html'),
    controller: function(){},
    location: 'result'
  }
};

function renderPage(page, data){
  var main = document.getElementById('page');
  var pageToRender = config[page].template;
  data = $.extend({}, data, config[page].data);
  main.innerHTML = Handlebars.compile(pageToRender)(data);
  config[page].controller();
  window.location.hash = config[page].location;
}

module.exports = {
  renderPage: renderPage
};
