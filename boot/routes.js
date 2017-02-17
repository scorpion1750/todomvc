var routesLoader=require('express-routes-loader');
var pUtil = require('path');

module.exports = function(app, params){
    routesLoader(app,pUtil.join(__dirname,'../routes'));
};