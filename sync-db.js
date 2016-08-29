var User = require('./model/user');
var Event = require('./model/event');

var db = require('./config/db');

db.sync({force: true});
