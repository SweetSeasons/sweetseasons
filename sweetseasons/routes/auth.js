const express = require('express');
const authRoutes = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const passport = require('passport');

//Controlador para la página de inicio y Signup
authRoutes.get('/', (req, res, next) => {
  res.render('signup', {
    errorMessage: undefined
  });
});

//Post para recoger los datos del formulario de Signup
authRoutes.post('/', (req, res, next) => {
  const {name, password, email, foodProfile} = req.body;
  if(name !== '' && password !== '' && email !== ''){
    User.findOne({name}, 'name')
      .then(userFinded => {
        if(userFinded === null){
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hash = bcrypt.hashSync(password, salt);

          new User({
            name,
            password: hash,
            email, foodProfile
          }).save()
            .then(() => {
              res.redirect('/login');
            })
            .catch(error => {
              res.render('signup', {
                errorMessage: 'Something went wrong!'
              })
            });
        }
      })
      .catch(error => {
        res.render('signup', {
          errorMessage: 'The user already exists'
        })
      });
  } else{
    res.render('signup', {
      errorMessage: 'Fill all fields!'
    });
  }
});

//Controlador para visualizar Login
authRoutes.get('/login', (req, res, next) => {
  res.render('login');
});

//Post para realizar login
authRoutes.post('/login', passport.authenticate('local', {
  successRedirect: '/main',
  failureRedirect: '/login',
  failureFlash: true,
  passReqToCallback: true
}));

authRoutes.get('/main', (req, res, next) => {
  res.render('main');
});

module.exports = authRoutes;
