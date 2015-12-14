'use strict';

var express = require('express');
var controller = require('./section.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.add);
router.get('/:id', controller.find);
router.post('/:id', controller.update);


module.exports = router;
