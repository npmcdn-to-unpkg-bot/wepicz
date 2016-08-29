var Sequelize = require('sequelize');
var db = require('../config/db');

var Event = db.define('event', {
  name: {
    type: Sequelize.STRING
  },
  hashtags: {
    type: Sequelize.STRING
  },
  dateFrom: {
    type: Sequelize.DATE
  },
  dateTo: {
    type: Sequelize.DATE
  },
  latitude: {
    type: Sequelize.FLOAT
  },
  longitude: {
    type: Sequelize.FLOAT
  },
  country: {
    type: Sequelize.STRING
  },
  state: {
    type: Sequelize.STRING
  },
  city: {
    type: Sequelize.STRING
  },
  instagramToken: {
    type: Sequelize.STRING
  }
});

module.exports = Event;
