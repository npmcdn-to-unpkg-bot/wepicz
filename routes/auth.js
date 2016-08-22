var socialConfigs = require('../config/social-configs');

const checkToken = function (req, res, next) {
  if (socialConfigs.instagram.accessToken) {
    next();
  } else {
    res.redirect('/instagram/authorize');
  }
};

module.exports = checkToken;
