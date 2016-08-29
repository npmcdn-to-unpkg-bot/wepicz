var express = require('express');
var router = express.Router();

const EventModel = require('../model/event');

router.get('/',
  function(req, res) {
    
    EventModel.findAll().then(function (events) {

      res.json(events);

    })
  }
);

module.exports = router;
