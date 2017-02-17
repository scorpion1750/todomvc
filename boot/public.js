var express = require('express');
var pUtil = require('path');
module.exports = function (app, params){
    app.use(express.static(pUtil.join(__dirname, '../public')));
};