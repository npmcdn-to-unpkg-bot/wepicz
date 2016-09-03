var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.get('/', function(req, res) {

  res.sendFile('index.htm', { root: path.join(__dirname, '../public/landing') });

});

router.post('/subscribe', function(req, res) {

  res.json({
    valid: 1,
    message: 'Thanks for subscribing'
  });

});

router.get('/:page', function(req, res, next) {

  //res.sendFile('../public/landing/index.htm');
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
