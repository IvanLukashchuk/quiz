import Handlebars from 'handlebars';

module.exports = function() {
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
