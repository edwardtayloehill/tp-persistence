var Sequelize = require('sequelize');
var db = require('./_db');
var Place = require('./place');

var Restaurant = db.define('restaurant', {
  name: Sequelize.STRING,
  price: {
    type: Sequelize.INTEGER,
    validate: { min: 1, max: 5 }
  },
  cuisine: Sequelize.STRING
}, {
  defaultScope: {
    include: [Place]
  },
  getterMethods: {
    type: function () {
      return 'restaurant'
    }
  }
});

module.exports = Restaurant;
