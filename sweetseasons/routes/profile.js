const multer = require('multer');
const express = require('express');
const profileRoutes = express.Router();
const User = require('../models/User');
const upload = multer({dest: 'uploads/'});

profileRoutes.get('/', (req, res, next) => {
  res.render('profile', {
    user: req.user
  });
});

profileRoutes.get('/edit/:id', (req, res, next) => {
  console.log(req.user);
  res.render('editProfile');
});

profile.post('/edit', (req, res, next) => {

});

module.exports = profileRoutes;
