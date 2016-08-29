var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');

const UserModel = require('../model/user');

router.post('/login', function(req, res) {

  UserModel.findByEmail(req.body.email).then(function (user) {

    if (!user) {
      res.status(401).json({error: "NotFound"});
    } else {
      var token = jwt.sign({ userId: user.id }, 'eventpic');
      res.json({ token: token });
    }

  })

});

module.exports = router;
