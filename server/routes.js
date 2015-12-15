/**
 * Main application routes
 */

'use strict';

//var errors = require('./components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  
  app.use('/api/myaa', require('./api/myaa'));
  app.use('/api/pattern', require('./api/pattern'));
  app.use('/api/assets', require('./api/assets'));
  app.use('/api/section', require('./api/section'));
  app.use('/api/sectionComponent', require('./api/section_component'));

  
  // // All undefined asset or api routes should return a 404
  // app.route('/:url(app|api|auth|components|app|bower_components|assets)/*')
   // .get(errors[404]);


  // All other routes should redirect to the index.html
  app.route('/')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};

