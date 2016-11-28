var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');
var Day = require('../models/day');

router.post('/', function(req, res, next){
  Day.create()
  .then((dayReturn) => res.json(dayReturn))
  .catch(next);
})


router.post('/:id/hotel', function(req,res,next){
  console.log(req.params.id)
  Day.create({
    number: req.params.id
  })
  .then(function(returnVal){
    console.log(returnVal)
  })
})

//
router.get('/', function(req,res,next){
  Day.findAll()
  .then((daysReturn) => res.json(daysReturn))
})


module.exports = router;
