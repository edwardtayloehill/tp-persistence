'use strict';
/* global $ utilsModule tripModule attractionsModule */

/**
 * A module for constructing front-end `day` objects, optionally from back-end
 * data, and managing the `attraction`s associated with a day.
 *
 * Day objects contain `attraction` objects. Each day also has a `.$button`
 * with its day number. Days can be drawn or erased via `.show()` and
 * `.hide()`, which updates the UI and causes the day's associated attractions
 * to `.show()` or `.hide()` themselves.
 *
 * This module has one public method: `.create()`, used by `days.js`.
 */

var dayModule = (function () {

    // jQuery selections

    var $dayButtons, $dayTitle;
    $(function () {
        $dayButtons = $('.day-buttons');
        $dayTitle = $('#day-title > span');
    });

    // Day class and setup

    function Day(data) {
        // for brand-new days
        this.number = 0;
        this.hotel = null;
        this.restaurants = [];
        this.activities = [];
        // for days based on existing data
        utilsModule.merge(data, this);
        if (this.hotel) this.hotel = attractionModule.create(this.hotel);
        this.restaurants = this.restaurants.map(attractionModule.create);
        this.activities = this.activities.map(attractionModule.create);
        // remainder of constructor
        this.buildButton().showButton();
    }

    // automatic day button handling

    Day.prototype.setNumber = function (num) {
        this.number = num;
        this.$button.text(num);
    };

    Day.prototype.buildButton = function () {
        this.$button = $('<button class="btn btn-circle day-btn"></button>')
            .text(this.number);
        var self = this;
        this.$button.on('click', function () {
            this.blur(); // removes focus box from buttons
            tripModule.switchTo(self);
        });
        return this;
    };

    Day.prototype.showButton = function () {
        this.$button.appendTo($dayButtons);
        return this;
    };

    Day.prototype.hideButton = function () {
        this.$button.detach(); // detach removes from DOM but not from memory
        return this;
    };

    Day.prototype.show = function () {
        // day UI
        this.$button.addClass('current-day');
        $dayTitle.text('Day ' + this.number);
        // attractions UI
        function show(attraction) {
            attraction.show();
        }

        if (this.hotel) show(this.hotel);
        this.restaurants.forEach(show);
        this.activities.forEach(show);
    };

    Day.prototype.hide = function () {
        // day UI
        this.$button.removeClass('current-day');
        $dayTitle.text('Day not Loaded');
        // attractions UI
        function hide(attraction) {
            attraction.hide();
        }

        if (this.hotel) hide(this.hotel);
        this.restaurants.forEach(hide);
        this.activities.forEach(hide);
    };

    // day updating

    Day.prototype.addAttraction = function (attraction) {

        // JOE SAYS #3
        // Depending on the attraction type, make an AJAX request to
        // add this hotel/restaurant/activity to the day.
        // Make sure you are interfacing with the route correctly
        // meaning you are using the correct data structure (req.body)
        // hitting the right URL, etc.
        // Call the following function after your server responds:
        var doThisAfterServerHasAddedAttraction = function () {
            attraction.show();
        };
        switch (attraction.type) {
            case 'hotel':
                if (this.hotel) this.hotel.hide();
                this.hotel = attraction;
                break;
            case 'restaurant':
                utilsModule.pushUnique(this.restaurants, attraction);
                break;
            case 'activity':
                utilsModule.pushUnique(this.activities, attraction);
                break;
            default:
                console.error('bad type:', attraction);
        }
    };

    Day.prototype.removeAttraction = function (attraction) {

        // JOE SAYS #4
        // Depending on the attraction type, make an AJAX request to
        // remove this hotel/restaurant/activity from the day.
        // Call the following function after your server responds:
        var doThisAfterServerHasRemovedAttraction = function () {
            attraction.hide();
        };

        switch (attraction.type) {
            case 'hotel':
                this.hotel = null;
                break;
            case 'restaurant':
                utilsModule.remove(this.restaurants, attraction);
                break;
            case 'activity':
                utilsModule.remove(this.activities, attraction);
                break;
            default:
                console.error('bad type:', attraction);
        }
    };

    // globally accessible module methods

    var publicAPI = {

        create: function (databaseDay) {
            return new Day(databaseDay);
        }

    };

    return publicAPI;

}());
