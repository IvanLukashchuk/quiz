var router = require('./router');
import hbCustom from './handlebars/customHandlers';
import questions from './data/question';
questions();
hbCustom();
router.renderPage(window.location.hash.substr(1), {});


