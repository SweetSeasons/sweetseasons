const multer = require('multer');
const express = require('express');
const profileRoutes = express.Router();
const User = require('../models/User');
const Score = require('../models/Score');
const upload = multer({dest: './public/uploads/picProfile'});

profileRoutes.get('/:name', (req, res, next) => {

  User.findOne({
      name: req.params.name
    })
    .then(user => {
      console.log('Friends: ' + user.friends);
      if (user !== null) {
        //Cargar todos los amigos y poblarlos
        User.findOne({
            name: req.params.name
          })
          .populate({
            path: 'friends'
          })
          .then(user => {
            console.log(user.friends);
            res.render('profile', {
              user, //El usuario de la vista
              userActive: req.user //El usuario activo (el que está en sesión)
            });
          })
          .catch(error => {
            console.log('Mal!');
          });
      }else{
        res.redirect('/main');
      }
    })
    .catch(error => {
      res.redirect('/main');
    });
});

profileRoutes.get('/edit/:id', (req, res, next) => {
  res.render('editProfile', {
    user: req.user
  });
});

profileRoutes.post('/edit/:id', upload.single('photo'), (req, res, next) => {
  let id = req.params.id,
    photo = '';
  req.file ? photo = req.file.filename : photo = req.user.photo;
  const newData = {
    name: req.body.name,
    photo,
    email: req.body.email,
    about: req.body.about,
    foodProfile: req.body.foodProfile
  };

  User.findByIdAndUpdate(id, newData)
    .then(() => {
      res.redirect(`/profile/${req.user.name}`);
    })
    .catch((error) => {
      return next(error);
    });
});

profileRoutes.get('/add/:id', (req, res, next) => {
  let id = req.params.id;
  let addFriend = true;
  User.findOne({
      name: req.user.name
    }, 'friends')
    .then(user => {
      console.log(user);
      user.friends.forEach(f => {
        if ((f.toString()) === id) {
          addFriend = false;
          return;
        }
      });

      if (addFriend) {
        User.update({
            _id: req.user.id
          }, {
            $push: {
              friends: req.params.id
            }
          })
          .then(() => {
            User.update({
                _id: req.params.id
              }, {
                $push: {
                  friends: req.user.id
                }
              })
              .then(() => {
                console.log('Enter good!');
              })
              .catch(error => {
                console.log('Something went wrong');
              });
            res.redirect(`/profile/${req.user.name}`);
          })
          .catch(error => {
            console.log('Something went wrong!');
          });
      } else {
        //Redirección temporal
        res.redirect(`/profile/${req.user.name}`);
      }
    })
    .catch(error => {
      console.log('Something went wrong!');
    });
});
    //Antes de hacer actualización hay que añadir la id de la
    //receta en la colección, para poder saber cuál hay que actualizar
  profileRoutes.post('/:name/upload', upload.single('photo'), (req, res, next) => {
    Score.update({});
  });

module.exports = profileRoutes;
