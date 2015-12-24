'use strict';

var express = require('express');
var controller = require('./pattern.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/url', controller.addPatternUrl);
router.get('/:id', controller.get);

module.exports = router;
