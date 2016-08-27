var Sequelize = require('sequelize');
var db = require('../config/db');

var User = db.define('user', {
  username: {
    type: Sequelize.STRING
  },
  email: {
    type: Sequelize.STRING
  },
  password: {
    type: Sequelize.STRING
  },
  instagramToken: {
    type: Sequelize.STRING
  }
});

User.findByToken = function(token) {
  return User.findOne({
    where: {
      email: token.split('|')[0]
    }
  });
}

module.exports = User;
