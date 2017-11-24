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

  updatedAt: [{
     type : Date,
     default : Date.now
   }]

});

module.exports = mongoose.model('Score', scoreSchema);
