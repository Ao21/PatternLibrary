'use strict';

var express = require('express');
var controller = require('./section.controller');

var router = express.Router();

router.get('/', controller.index);
router.post('/', controller.add);
router.post('/addPattern', controller.addPattern);
router.post('/addComponent', controller.addSectionComponent);
router.post('/updateComponent', controller.updateSectionComponent);
router.post('/removeComponent', controller.removeSectionComponent);
router.get('/:url', controller.find);
router.post('/:id', controller.update);


module.exports = router;
