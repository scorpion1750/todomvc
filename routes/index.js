var router = require("express").Router();

router.get('/', function (req, res) {
    res.send('hello world');
});



module.exports = require('merge')({
    '/': router
}, require('rqdir')(__dirname));