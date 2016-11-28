const express = require('express');
const router = express.Router();
const Restaurant = require("../../models/restaurant.js")

modules.export = router;

router.get('/api/restaurants', function(req,res,next){
  Restaurant.findAll()
  .then(function(restaurantReturn){
    res.json(restaurantReturn)
  })
  .catch(next);
})


// $.get('/api/restaurants')
// .then(function (restaurants) {
//   restaurants.forEach(function(restaurant){
//     console.log(restaurant.name);
//   });
// })
// .catch( console.error.bind(console) );
//

// $.ajax({
//   method: "GET",
//   url: "http://localhost/3000/api/restaurants",
//   data: restaurantModel,
//   cache: false,
//   success: function(data){
//     console.log(res)
//     // this is where we show the data on the webpage
//     // $('#result').text(data)
