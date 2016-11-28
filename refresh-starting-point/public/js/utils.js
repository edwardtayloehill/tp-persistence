'use strict';

/**
 * This module is for miscellaneous helper functions which may be reused
 * across multiple modules, or else which clear up the main module code
 * through abstraction. It could easily be replaced by lodash.
 */

var utilsModule = {

  // copies properties from source onto target object
  merge: function (source, target) {
    if (!source) return;
    Object.keys(source).forEach(function (key) {
      target[key] = source[key];
    });
  },

  // pushes into array, but only if the item isn't already inside it
  pushUnique: function (array, item) {
    if (array.indexOf(item) > -1) return;
    return array.push(item);
  },

  // removes a given item from an array if it's inside it
  remove: function (array, item) {
    var index = array.indexOf(item);
    if (index === -1) return;
    return array.splice(index, 1);
  },

  logErr: console.error.bind(console)

};
