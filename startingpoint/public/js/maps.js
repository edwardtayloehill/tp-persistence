'use strict';
/* global google */

var mapModule = (function () {

  var currentMap,
      currentMarkers = [],
      currentBounds = new google.maps.LatLngBounds(),
      GraceHopperAcademy = new google.maps.LatLng(40.705086, -74.009151);

  // build and attach when document is ready

  $(function initializeMap (){
    var mapCanvas = document.getElementById('map-canvas');
    var options = {
      center: GraceHopperAcademy,
      zoom: 13,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      styles: styleArr
    };
    currentMap = new google.maps.Map(mapCanvas, options);
  });

  // private module functions

  function extendBounds (marker) {
    currentBounds.extend(marker.position);
    currentMap.fitBounds(currentBounds);
  }

  function narrowBounds () {
    // rebuild bounds from scratch
    currentBounds = new google.maps.LatLngBounds();
    currentMarkers.forEach(function (marker) {
      currentBounds.extend(marker.position);
    });
    // re-scale the map
    if (currentMarkers.length) {
      currentMap.fitBounds(currentBounds);
    } else {
      currentMap.setOptions({
        zoom: 13,
        center: GraceHopperAcademy
      });
    }
  }

  // globally accessible module methods

  var publicAPI = {

    // mixing concerns here, but the attractions module was getting big
    buildAttractionMarker: function (attraction) {
      var iconPath = {
        hotel: '/images/lodging_0star.png',
        restaurant: '/images/restaurant.png',
        activity: '/images/star-3.png'
      };
      var coords = attraction.place.location;
      var options = {
        icon: iconPath[attraction.type],
        position: new google.maps.LatLng(coords[0], coords[1]),
        animation: google.maps.Animation.DROP
      };
      return new google.maps.Marker(options);
    },

    draw: function (marker) {
      marker.setAnimation(google.maps.Animation.DROP);
      marker.setMap(currentMap);
      currentMarkers.push(marker);
      extendBounds(marker);
      return marker;
    },

    hide: function (marker) {
      marker.setMap(null);
      currentMarkers.splice(currentMarkers.indexOf(marker), 1);
      narrowBounds();
      return marker;
    }

  };

  return publicAPI;

}());


// styles

var styleArr = [{
  featureType: 'landscape',
  stylers: [{ saturation: -100 }, { lightness: 60 }]
}, {
  featureType: 'road.local',
  stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
}, {
  featureType: 'transit',
  stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
}, {
  featureType: 'administrative.province',
  stylers: [{ visibility: 'off' }]
}, {
  featureType: 'administrative.neighborhood',
  elementType: 'labels.text.fill',
  stylers: [{ color: '#456580' }, { lightness: 30 }]
}, {
  featureType: 'water',
  stylers: [{ visibility: 'on' }, { lightness: 30 }]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.fill',
  stylers: [{ color: '#5b8bb3' }, { lightness: 40 }]
}, {
  featureType: 'road.highway',
  elementType: 'geometry.stroke',
  stylers: [{ visibility: 'off' }]
}, {
  featureType: 'poi.park',
  elementType: 'geometry.fill',
  stylers: [{ color: '#a7cfa5' }, { lightness: 40 }, { saturation: -40 }]
}];
