const express = require('express');
const profileRoutes = express.Router();
const User = require('../models/User');

profileRoutes.get('/', (req, res, next) => {
  res.render('profile', {
    user: req.user
  });
});

module.exports = profileRoutes;
