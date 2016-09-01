var express = require('express');
var router = express.Router();
var request = require('request');

const instagramConfig = require('../config/social-configs').instagram;

/* GET home page. */
router.get('/authorize', function(req, res, next) {
  const url = `${instagramConfig.authorizeUrl}?` +
                `client_id=${instagramConfig.clientId}&` +
                `redirect_uri=${instagramConfig.authorizeUrlCallback}&` +
                `response_type=code&` +
                `scope=public_content`;

  res.redirect(url);
});

router.get('/authorize-callback', function(req, res, next) {
  const requestCode = req.query.code;

  request.post(
      'https://api.instagram.com/oauth/access_token',
      {
        form: {
          client_id: instagramConfig.clientId,
          client_secret: instagramConfig.clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: instagramConfig.authorizeUrlCallback,
          code: requestCode
        }
      },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {

              var info = JSON.parse(body);

              instagramConfig.accessToken = info.access_token;

              res.redirect('/slider');
          } else {
            res.send(error);
          }
      }
  );
});

module.exports = router;
