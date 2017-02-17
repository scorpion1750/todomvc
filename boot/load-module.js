var moduleServ = require('express-module-serv');
var p = require('path');
var options = {
  routePath: '/m', //default 
  loaderPath: '/mloader.js', //default 
  pathSettings: {
    // requried 
    base: p.join(__dirname , '../public/scripts'),
    // optional prefix path settings 
    paths: {
        common: p.join(__dirname , '../common'),
        application: p.join(__dirname , '../application'),
        dist: p.join(__dirname , '../dist'),
        'm-react':p.join(__dirname,'../node_modules/m-react/build/m-react.js'),
        'css': p.join(__dirname , '../public/styles'),
    }
  },
  debug: true, //default is false, skip minifying loader script 
 
  //optional, set globals on window 
  globals: {
    version: '1.0'
  },
 
  cacheControlExpiration: 10800, //default 0, set duration for expiration in seconds 
 
  //default is true, set false in case you don't need rebuild when src file is updated, for example in production environment. 
  reloadOnChange: true
};
 
//customize transformers if you need support loading css or svg modules 
 
options.transformers = [
  //support loading css files, requiring the similar settings as the static middleware needs 
  //for resource url correction 
  require('express-module-serv/transformers/css-wrapper')({
    staticPath: p.join(__dirname , '../public'),
    routePath: '/'
  }),
  //support CommonJS standard 
  require('express-module-serv/transformers/cmd-wrapper')(),
  //add comma and new line 
  require('express-module-serv/transformers/add-comma')()
];
module.exports = function(app, params){
    moduleServ(app,options);
};