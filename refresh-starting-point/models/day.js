var Sequelize = require('sequelize');
var db = require('./_db');

var Day = db.define('day', {
    number: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
   hooks: {
       beforeDestroy: function (dayBeingDestroyed) {
            // Maybe this hook could help?
       }
   }
});


module.exports = Day;