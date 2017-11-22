const multer = require('multer');
const express = require('express');
const profileRoutes = express.Router();
const User = require('../models/User');
const upload = multer({dest: './public/uploads/picProfile'});

profileRoutes.get('/', (req, res, next) => {
  console.log(req.user);
  res.render('profile', {
    user: req.user
  });
});

profileRoutes.get('/edit/:id', (req, res, next) => {
  console.log(req.user);
  res.render('editProfile', {
    user:req.user
  });
});

//Esto hay que mejorarlo
profileRoutes.post('/edit/:id', upload.single('photo'), (req, res, next) => {
  let id = req.params.id, photo = '';
  req.file ? photo = req.file.filename : photo = req.user.photo;
  const newData = {
    name: req.body.name,
    photo,
    email: req.body.email,
    about: req.body.about,
    foodProfile: req.body.foodProfile
  };

  User.findByIdAndUpdate(id, newData)
      .then((userFinded) => {
        res.redirect('/profile');
      }).catch((error) => {
        return next(error);
      });
});

module.exports = profileRoutes;
