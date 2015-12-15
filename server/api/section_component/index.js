'use strict';

var express = require('express');
var controller = require('./section_component.controller');
var dummy = require('./dummy')

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.add);
router.get('/:url', controller.find);
router.post('/:id', controller.update);


module.exports = router;
