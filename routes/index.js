"use strict";

var express = require('express'),
    router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'RasPi Radio', script: '<script src="/javascripts/script.js"></script>' });
});

module.exports = router;
