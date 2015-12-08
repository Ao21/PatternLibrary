'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/patternLibrary-dev'
  },

  seedDB: true,
  
  client: '/src/public',
  
  whiteList: ['http://localhost:3000']
};
