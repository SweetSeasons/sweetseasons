const express = require('express');
const calendarRoute = express.Router();
const User = require('../models/User');
const Recipe = require('../models/Recipe');
const Score = require('../models/Score');

calendarRoute.get('/', (req, res, next) => {
  console.log(req.user.name, req.user.foodProfile);
  Recipe.find(req.user.foodProfile == 'vegan' ? {
      foodProfile: req.user.foodProfile
    } : {})
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

function getValue(all) {
  return ~~(Math.random() * all.length);
};

  calendarRoute.get('/recipe/:id', (req, res, next) => {
    let id = req.params.id;
    if(req.user.recipe){
      id = req.user.recipe;
    } else{
      const newRecipe = {recipe: id};
      User.findOne({_id:req.user.id})
        .populate({path: 'friends'})
        .then((user) => {
          User.findByIdAndUpdate(req.user.id, newRecipe)
            .then(() => {
              user.friends.forEach(f => {
                User.findByIdAndUpdate(f.id, newRecipe)
                  .then(() => {
                    console.log(`${f.name} has been updated!`);
                  })
                  .catch(error => {
                    console.log('Error during friend update');
                  });
              });
            })
            .catch(error => {
              console.log('Error during update');
            });
        })
        .catch(error => {
          console.log('Some sucks');
        });
    }
    Recipe.findById(id)
      .then(recipe => {

        res.render('recipes', {
          recipe,
          user:req.user
        });
      })
    .catch(error => {
      res.redirect('/calendar');
    });
});

module.exports = calendarRoute;
