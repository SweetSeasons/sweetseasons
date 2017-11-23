const express = require('express');
const calendarRoute = express.Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');

 calendarRoute.get('/', (req, res, next) => {
   console.log(req.user.name, req.user.foodProfile);
   Recipe.find(req.user.foodProfile == 'vegan' ? {foodProfile:req.user.foodProfile} : {})
    .then(all => {
      all.forEach(v => {
        console.log(v.name, v.foodProfile);
      });
      res.render('calendar', {
        all,
        recipes: getValue(all)
      });
    })
    .catch(error => {
      res.redirect('/main');
    });
  });

  function getValue(all){
    return ~~(Math.random() * all.length);
  };

  calendarRoute.get('/recipe/:id', (req, res, next) => {
    let id = req.params.id;
    Recipe.findById(id)
      .then(recipe => {
        res.render('recipes', {
          recipe
        });
      })
      .catch(error => {
        res.redirect('/calendar');
      });
  });

module.exports = calendarRoute;
