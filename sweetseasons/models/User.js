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
  picture: {
      name: String,
      pic_path: String,
      pic_name: String
    },
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('User', userSchema);
