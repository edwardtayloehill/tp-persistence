var Promise = require('bluebird');
var router = require('express').Router();
var Hotel = require('../models/hotel');
var Restaurant = require('../models/restaurant');
var Activity = require('../models/activity');


router.get('/api/restaurants', function(req,res,next){
  Restaurant.findAll()
  .then(function(restaurantReturn){
    res.json(restaurantReturn)
  })
  .catch(next);
})


router.get('/api/hotels', function(req,res,next){
  Hotel.findAll()
  .then(function(hotelReturn){
    res.json(hotelReturn)
  })
  .catch(next);
})


router.get('/api/activities', function(req,res,next){
  Activity.findAll()
  .then(function(activityReturn){
    res.json(activityReturn)
  })
  .catch(next);
})

router.get('/', function(req, res, next) {
  Promise.all([
    Hotel.findAll(),
    Restaurant.findAll(),
    Activity.findAll()
  ])
  .spread(function(dbHotels, dbRestaurants, dbActivities) {
    res.render('index', {
      templateHotels: dbHotels,
      templateRestaurants: dbRestaurants,
      templateActivities: dbActivities
    });
  })
  .catch(next);
});

module.exports = router;
