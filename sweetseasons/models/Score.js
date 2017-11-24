const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scoreSchema = new Schema({

  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  },

  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

  points: [Number],

  pic: [{
    type: String,
    default: ''
  }],
<<<<<<< HEAD
=======

>>>>>>> 3b1c858252f89f2715326f7fcd8d24216b5d1b98
  updatedAt: [{
     type : Date,
     default : Date.now
   }]

});

module.exports = mongoose.model('Score', scoreSchema);
