const mongoose = require('mongoose');
const Schema = mongoose.Schema;

<<<<<<< HEAD
const pointsSchema = new Schema({
=======
const scoreSchema = new Schema({

>>>>>>> 6cfc7ffd7b4ec3db1a4a1c8a66a645edc53f0f81
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
  timestamps: [{
    createdAt: 'created_at'
  }]
=======
  updatedAt: [{
     type : Date,
     default : Date.now
   }]
>>>>>>> 6cfc7ffd7b4ec3db1a4a1c8a66a645edc53f0f81

});

module.exports = mongoose.model('Score', scoreSchema);
