const express = require('express');
const authRoutes = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');
const {
  ensureLoggedIn,
  ensureLoggedOut
} = require('connect-ensure-login');

//Controlador para la página de inicio y Signup
authRoutes.get('/', (req, res, next) => {
  res.render('signup', {
    errorMessage: undefined
  });
});

//Post para recoger los datos del formulario de Signup
authRoutes.post('/', ensureLoggedOut(), (req, res, next) => {
  const {
    name,
    password,
    email,
    foodProfile
  } = req.body;
  if (name !== '' && password !== '' && email !== '') {
    User.findOne({
        name
      }, 'name')
      .then(userFinded => {
        if (userFinded === null) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hash = bcrypt.hashSync(password, salt);

          new User({
              name,
              password: hash,
              email,
              points: 0,
              leagues: 0,
              title: 'Beginner',
              about: '',
              foodProfile,
            }).save()
            .then(() => {
              res.redirect('/login');
            })
            .catch(error => {
              res.render('signup', {
                errorMessage: 'Something went wrong!'
              });
            });
        }
      })
      .catch(error => {
        res.render('signup', {
          errorMessage: 'The user already exists'
        });
      });
  } else {
    res.render('signup', {
      errorMessage: 'Fill all fields!'
    });
  }
});

//Controlador para visualizar Login
authRoutes.get('/login', ensureLoggedOut(), (req, res, next) => {
  res.render('login');
});

//Post para realizar login
authRoutes.post('/login', ensureLoggedOut(), passport.authenticate('local', {
  successRedirect: '/main',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}));

//Controlador para visualizar la página principal
authRoutes.get('/main', ensureLoggedIn(), (req, res, next) => {
  res.render('main', {
    user: req.user
  });
});

authRoutes.get('/logout', ensureLoggedIn(), (req, res, next) => {
  req.logout();
  req.session = null;
  res.redirect('/login');
});

module.exports = authRoutes;
