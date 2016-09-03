var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var validator = require('validator');

router.get('/', function(req, res) {

  res.sendFile('index.htm', { root: path.join(__dirname, '../public/landing') });

});

router.post('/subscribe', function(req, res) {

  const email = req.body.email

  if (validator.isEmail(email)) {

    fs.appendFile('./subscribers.txt', email + '\n', function (err) {

      if (!err) {
        res.json({
          valid: 1,
          message: 'Thanks for your subscription!'
        });
      } else {
        res.json({
          valid: 0,
          message: 'An error occurred, please try later'
        });
      }

    });

  } else {
    res.json({
      valid: 0,
      message: 'Insert a valid email address!'
    });
  }

});

router.get('/:page', function(req, res, next) {

  const filePath = path.join(__dirname, '../public/landing/' + req.params.page + '.htm');

  fs.stat(filePath, (err, stats) => {

    if (err) {
      next();
    } else if (stats.isFile()) {
      res.sendFile('index.htm', { root: path.join(__dirname, '../public/landing') });
    } else {
      next();
    }

  });

});

module.exports = router;
