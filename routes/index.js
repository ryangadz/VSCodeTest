'use strict';
var express = require('express');
var router = express.Router();

//home page
router.get('/', function (req, res){
    res.render('index', {title: 'VS Code'})
});

module.exports = router;