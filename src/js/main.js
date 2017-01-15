var loginPage = require('../tmpl/login-form.html');
var adminPage = require('../tmpl/admin/admin.html');
var quizPage = require('../tmpl/question.html');
var loginController = require('./pages/login.js');
var quizController = require('./pages/quiz');
// var Mustache = require('mustache');
import Handlebars from 'handlebars';
import $ from 'jquery';

Handlebars.registerHelper("inc", function(value, options)
{
    return parseInt(value) + 1;
});

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
    controller: function(){}
  }
  ,'result': {
    template: require('../tmpl/result.html'),
    controller: function(){}
  }
  ,'newQuestion': {
    template: require('../tmpl/admin/newQuestion.html'),
    controller: require('./pages/newQuestion')
  }
};

function renderPage(page, data){
  page = config[page] ? page : 'login'
  var storedData = JSON.parse(localStorage.getItem(page));
  storedData = storedData ? storedData : {};
  var main = document.getElementById('page');
  var pageToRender = config[page].template;
  $.extend(true, storedData, data);
  $.extend(true, storedData, config[page].data);
  localStorage.setItem(page, JSON.stringify(storedData));
  main.innerHTML = Handlebars.compile(pageToRender)(storedData);
  config[page].controller();
  window.location.hash = page;

  let as = $('a[href]');
  for (let i = 0; i < as.length; i++){
    let a = as[i];
    a.onclick = (event) =>{
        event.preventDefault();
        renderPage(event.target.href.substr(event.target.href.lastIndexOf('#') + 1), {});
    }
  }
}

module.exports = {
  renderPage: renderPage
};
