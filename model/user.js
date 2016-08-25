var Sequelize = require('sequelize');
var db = require('../config/db');

var User = db.define('user', {
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  }
});

module.exports = User;
