'use strict';
/* global $ mapModule tripModule utilsModule */

/**
 * This module builds front-end `attraction` objects from raw database
 * data. The attraction objects have both DOM `.$itineraryItem` elements
 * and Google Map `.marker`s stored on them as properties. The attractions also
 * have two important methods: `.show()` and `.hide()` cause the itinerary item
 * and marker to be displayed or erased, all automatically.
 *
 * The module has one publicly-usable method: `.create(data)`, which takes
 * a database object for an attraction and creates the live, prototypal
 * `attraction` object with its methods and extra properties. It then
 * returns that object. That method is used principally in `options.js`.
 */

var attractionModule = (function () {

  // jQuery selections

  var $itinerary, $hotel, $restaurants, $activities;
  $(function(){
    $itinerary = $('#itinerary');
    $hotel = $itinerary.find('ul[data-type="hotel"]');
    $restaurants = $itinerary.find('ul[data-type="restaurants"]');
    $activities = $itinerary.find('ul[data-type="activities"]');
  });

  // Attraction class setup

  function Attraction (data) {
    utilsModule.merge(data, this); // copy all key-val pairs into this new obj
    this.buildItineraryItem().buildMarker();
  }

  Attraction.prototype.buildItineraryItem = function () {
    var $button = $('<button class="btn btn-xs btn-danger remove btn-circle">x</button>');
    var $title = $('<span class="title"></span>').text(this.name);
    this.$itineraryItem = $('<div class="itinerary-item"></div>')
      .append($title)
      .append($button);
    var self = this;
    $button.on('click', function () {
      tripModule.removeFromCurrent(self); // remove from day model
    });
    return this;
  };

  Attraction.prototype.buildMarker = function () {
    this.marker = mapModule.buildAttractionMarker(this);
    return this;
  };

  // main methods meant to be used from any context (e.g. in tripModule)

  Attraction.prototype.show = function () {
    // itinerary
    switch (this.type) {
      case 'hotel': $hotel.append(this.$itineraryItem); break;
      case 'restaurant': $restaurants.append(this.$itineraryItem); break;
      case 'activity': $activities.append(this.$itineraryItem); break;
      default: console.error('bad type:', this);
    }
    // map
    mapModule.draw(this.marker);
  };

  Attraction.prototype.hide = function () {
    this.$itineraryItem.detach(); // itinerary
    mapModule.hide(this.marker); // map
  };

  // globally accessible module methods

  var publicAPI = {

    create: function (databaseAttraction) {
      return new Attraction(databaseAttraction);
    }

  };

  return publicAPI;

}());
