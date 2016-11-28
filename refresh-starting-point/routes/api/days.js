var express = require('express');
var router = express.Router();
module.exports = router;

var Day = require('../../models/day');
var Hotel = require('../../models/hotel');
var Restaurant = require('../../models/restaurant');
var Activity = require('../../models/activity');

// -- Day specific

// Get all days with attraction information
// /days
router.get('/', function (req, res, next) {
    Day.findAll({
        include: [Hotel, Restaurant, Activity],
        order: 'number ASC'
    })
        .then(function (days) {
            res.send(days);
        })
        .catch(next);
});

// Create a new day with no attractions
// POST /days
router.post('/', function (req, res, next) {

    Day.create(req.body)
        .then(function (createdDay) {
            res.status(201).send(createdDay);
        })
        .catch(next);

});

// Delete a day using that day's id
// DELETE /days/2
router.delete('/:id', function (req, res, next) {

    Day.findById(req.params.id)
        .then(function (dayThatShouldBeDestroyed) {
            return dayThatShouldBeDestroyed.destroy();
        })
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);

});

// ---

// -- Attractions on days

router.param('dayId', function (req, res, next, theDayId) {
    Day.findById(theDayId)
        .then(function (foundDay) {
            req.day = foundDay;
            next();
        })
        .catch(next);
});

// Register a hotel to a day
// /days/2/hotel
router.put('/:dayId/hotel', function (req, res, next) {
    req.day.setHotel(req.body.hotelId)
        .then(function (day) {
            res.sendStatus(204);
        })
        .catch(next);
});
// Register a restaurant to a day
// /days/2/restaurants

router.put('/:dayId/restaurants', function (req, res, next) {
    req.day.addRestaurant(req.body.restaurantId)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

// Register an activity to a day

router.put('/:dayId/activities', function (req, res, next) {
    req.day.addActivity(req.body.activityId)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

// Remove a hotel from a day
// /days/2/hotel

router.delete('/:dayId/hotel', function (req, res, next) {
    req.day.setHotel(null)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

// Remove a restaurant from a day
// /days/2/restaurants/16
router.delete('/:dayId/restaurants/:restaurantId', function (req, res, next) {
    req.day.removeRestaurant(req.params.restaurantId)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

// Remove an activity from a day

router.delete('/:dayId/activities/:activityId', function (req, res, next) {
    req.day.removeActivity(req.params.activityId)
        .then(function () {
            res.sendStatus(204);
        })
        .catch(next);
});

// ---