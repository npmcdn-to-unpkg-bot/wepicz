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

router.post('/',
  function(req, res) {

    const user = {
      userId: req.user.userId
    }

    const event =  Object.assign(req.body.event, user);

    EventModel.upsert(event).then(function (created) {

      res.json(created);

    })
  }
);

router.get('/:id',
  function(req, res) {
    
    EventModel.findOne({
      where: {
        id: req.params.id
      }
    }).then(function (event) {

      res.json(event);

    })
  }
);

module.exports = router;
