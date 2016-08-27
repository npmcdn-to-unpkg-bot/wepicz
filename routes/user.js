var express = require('express');
var router = express.Router();

const UserModel = require('../model/user');

router.post('/login', function(req, res) {
  console.log(req.body);

  var token = req.body.email + '|' + req.body.password;

  UserModel.findByToken(token).then(function (user) {

    if (!user) {
      res.status(401).json({error: "NotFound"});
    } else {
      res.json({ token: token });
    }

  })

});

module.exports = router;
