"use strict";

var express = require('express'),
    router = express.Router(),
    config = require("config");

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'RasPi Radio', "text-radio": config.get("lang.radio"), "text-speaker": config.get("lang.speaker"), script: '<script src="/javascripts/script.js"></script>' });
});

module.exports = router;
