const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema({
  name: String,
  foodProfile: {
    type: String,
    enum: ['vegan', 'veggie']
  },
  imgUrl: String,
  duration: String,
  level: {
    type: Number,
    enum: [1, 2, 3, 4, 5]
  },
  points: Number,
  ingredients: [String],
  preparation: String,
  price: {
    type: Number,
    enum: [10, 50, 100]
  }
});

module.exports = mongoose.model('Recipe', recipeSchema);
