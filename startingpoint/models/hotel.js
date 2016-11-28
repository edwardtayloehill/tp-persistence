/* eslint-disable camelcase */
var Sequelize = require('sequelize');
var db = require('./_db');
var Place = require('./place');

var Hotel = db.define('hotel', {
  name: Sequelize.STRING,
  num_stars: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 }
  },
  amenities: Sequelize.STRING
}, {
  defaultScope: {
    include: [Place]
  },
  getterMethods: {
    type: function () {
      return 'hotel'
    }
  }
});

module.exports = Hotel;
