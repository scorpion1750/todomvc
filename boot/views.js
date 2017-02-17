var exphbs  = require('express-hbs');
var pUtil = require('path');
module.exports = function(app, params){
    app.engine('html', exphbs.express3());
    app.set('view engine', 'html');
    app.set('views',pUtil.join(__dirname, '../views'));
}

