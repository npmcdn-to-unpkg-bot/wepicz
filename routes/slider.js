var express = require('express');
var router = express.Router();
var request = require('request');

const instagramConfig = require('../config/social-configs').instagram;

const checkToken = function (req, res, next) {
  if (instagramConfig.accessToken) {
    next();
  } else {
    res.redirect('/instagram/authorize');
  }
};

/* GET home page. */
// router.get('/', checkToken, function(req, res, next) {
//   res.render('slider');
// });

router.get('/', checkToken, function(req, res, next) {
  res.render('player');
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

function getImages(url) {

  const promise = new Promise(function(resolve, reject){
    request.get(
        url,
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
              var json = JSON.parse(body);
              resolve(json.data);
            } else {
              reject(error);
            }
        }
    );
  });

  return promise

}


router.get('/slider-data', checkToken, function(req, res, next) {

  const url1 = 'https://api.instagram.com/v1/tags/wepicz/media/recent?access_token=' + instagramConfig.accessToken;
  const url2 = 'https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + instagramConfig.accessToken;
  //
  // request.get(
  //     url,
  //     function (error, response, body) {
  //         if (!error && response.statusCode == 200) {
  //           var json = JSON.parse(body);
  //           res.json(json.data);
  //         } else {
  //           res.send(error);
  //         }
  //     }
  // );

  getImages(url1).then((data1) => {

    getImages(url2).then((data2) => {


      res.json(data2.concat(data1));
    })
  })

});

module.exports = router;
