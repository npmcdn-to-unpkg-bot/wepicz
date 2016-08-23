var express = require('express');
var router = express.Router();
var request = require('request');

const instagramConfig = require('../config/social-configs').instagram;

const checkToken = require('./auth');

/* GET home page. */
router.get('/', checkToken, function(req, res, next) {
  res.redirect('/slider');
});

router.get('/recent', checkToken, function(req, res, next) {

  const url = 'https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + instagramConfig.accessToken;

  console.log(url);

  request.get(
      url,
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body)

              var info = JSON.parse(body);

              res.render('recent', { images: info.data });
          } else {
            console.log('Error')
            console.log(error)
            console.log(response)
            res.send(error);
          }
      }
  );

});

router.get('/slider-data', checkToken, function(req, res, next) {

  const url = 'https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + instagramConfig.accessToken;

  request.get(
      url,
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
            var json = JSON.parse(body);
            res.json(json.data);
          } else {
            res.send(error);
          }
      }
  );

});

router.get('/slider', checkToken, function(req, res, next) {
  res.render('slider');
});

module.exports = router;
