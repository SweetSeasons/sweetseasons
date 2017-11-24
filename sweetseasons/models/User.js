const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: String,
  password: String,
  email: String,
  points: Number,
  leagues: Number,
  title: String,
  about: String,
  foodProfile: {
    type: String,
    enum: ['vegan', 'veggie']
  },
  photo: {type: String, default: ''},
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  }
});

module.exports = mongoose.model('User', userSchema);
