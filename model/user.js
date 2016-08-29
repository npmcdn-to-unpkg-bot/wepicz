var Sequelize = require('sequelize');
var db = require('../config/db');

var Event = require('./event');

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
  },

});

User.hasMany(Event, {as: 'Events'})

User.findByEmail = function(email) {
  return User.findOne({
    where: {
      email: email
    }
  });
}

module.exports = User;
