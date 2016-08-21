var express = require('express');
var router = express.Router();
var request = require('request');

var accessToken;

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  const clientId = '05c5eda966c8414c84f2d03d93f3dd6f';
  const redirectUrl = 'http://eventpic.ddns.net:3000/validate-instagram-callback';


  const baseUrl = 'https://api.instagram.com/oauth/authorize/';

  let url = `${baseUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&response_type=code&scope=public_content`;

  res.redirect(url);
});

router.get('/validate-instagram-callback', function(req, res, next) {
  const code = req.query.code;
  const clientId = '05c5eda966c8414c84f2d03d93f3dd6f';
  const clientSecret = 'a6de9c1c043141a99b9000679ab8409a';
  const redirectUrl = 'http://eventpic.ddns.net:3000/validate-instagram-callback';

  request.post(
      'https://api.instagram.com/oauth/access_token',
      {
        form: {
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          redirect_uri: redirectUrl,
          code: code
        }
      },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body)

              var info = JSON.parse(body);

              accessToken = info.access_token;

              console.log(accessToken);

              res.redirect('/recent');
          } else {
            console.log('Error')
            console.log(error)
            console.log(response)
            res.send(error);
          }
      }
  );
});

router.get('/recent', function(req, res, next) {

  const url = 'https://api.instagram.com/v1/tags/nofilter/media/recent?access_token=' + accessToken;

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


module.exports = router;
