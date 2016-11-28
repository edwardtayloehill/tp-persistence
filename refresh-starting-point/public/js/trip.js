'use strict';
/* global $ dayModule */

/**
 * A module for managing multiple days & application state.
 * Days are held in a `days` array, with a reference to the `currentDay`.
 * Clicking the "add" (+) button builds a new day object (see `day.js`)
 * and switches to displaying it. Clicking the "remove" button (x) performs
 * the relatively involved logic of reassigning all day numbers and splicing
 * the day out of the collection.
 *
 * This module has four public methods: `.load()`, which currently just
 * adds a single day (assuming a priori no days); `switchTo`, which manages
 * hiding and showing the proper days; and `addToCurrent`/`removeFromCurrent`,
 * which take `attraction` objects and pass them to `currentDay`.
 */

var tripModule = (function () {

    // application state

    var days = [],
        currentDay;

    // jQuery selections

    var $addButton, $removeButton;
    $(function () {
        $addButton = $('#day-add');
        $removeButton = $('#day-title > button.remove');
    });

    // method used both internally and externally

    function switchTo(newCurrentDay) {
        if (currentDay) currentDay.hide();
        currentDay = newCurrentDay;
        currentDay.show();
    }

    // jQuery event binding

    $(function () {

        $addButton.on('click', function () {

            // JOE SAYS #2
            // Make a POST request with AJAX to the backend here
            // to add a new day to the database
            // Don't forget to include the number of the day in the request body!
            // You can get the day number you need with `days.length + 1`
            // Call this function when the server responds with the createdDay.
            var doThisWithCreatedDayFromServer = function (createdDay) {
                addDay(createdDay);
            };

        });

        $removeButton.on('click', deleteCurrentDay);

    });

    function addDay(dayInfo) {
        if (this && this.blur) this.blur(); // removes focus box from buttons
        var newDay = dayModule.create(dayInfo); // dayModule
        days.push(newDay);
        if (days.length === 1) {
            currentDay = newDay;
        }
        switchTo(newDay);
    }

    function deleteCurrentDay() {

        // prevent deleting last day
        if (days.length < 2 || !currentDay) return;

        // JOE SAYS #5
        // Delete a day by contacting the correct on the server.
        // Note: if you delete a day that isn't the last day, the numbers
        // of the days after it will stay the same! Not good!
        // How would you fix this on the backend?
        // Call this function after the server responds saying a day was deleted.
        var doThisAfterDayIsDeleted = function () {
            // remove from the collection
            var index = days.indexOf(currentDay),
                previousDay = days.splice(index, 1)[0],
                newCurrent = days[index] || days[index - 1];
            // fix the remaining day numbers
            days.forEach(function (day, i) {
                day.setNumber(i + 1);
            });
            switchTo(newCurrent);
            previousDay.hideButton();
        };

    }

    // globally accessible module methods

    var publicAPI = {

        load: function () {

            // JOE SAYS #1
            // Fetch all the days from the server with an AJAX request.
            // Ask the server for the days by GET requesting /days.
            // Call the following function when the server responds
            // with the days.
            var doThisWhenServerGivesDaysBack = function (daysFromServer) {
                daysFromServer.forEach(addDay);
                switchTo(days[0]);
            };

        },

        switchTo: switchTo,

        addToCurrent: function (attraction) {
            currentDay.addAttraction(attraction);
        },

        removeFromCurrent: function (attraction) {
            currentDay.removeAttraction(attraction);
        }

    };

    return publicAPI;

}());
