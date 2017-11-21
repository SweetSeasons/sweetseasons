const passport = require('passport');
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

//Necesito darle unas vueltas a esto para acabar de entenderlo
passport.use(new LocalStrategy((username, password, next) => {
  console.log('Llega hasta aqui');
  User.findOne({name:username}, (err, user) => {
    if(err){return next (err);
    }
    if(!user){
      return next(null, false, {message: 'Incorrect name'});
    }
    if(!bcrypt.compareSync(password, user.password)){
      return next(null, false, {message: 'Incorrect password'});
    }

    return next(null, user);
  });
}));
