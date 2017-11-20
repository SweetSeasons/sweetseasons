const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: String,
  time: Number,
  recipe: {
    type: Schema.Type.ObjectId,
    ref: 'Recipe'
  }
});

module.exports = mongoose.model('Group', groupSchema);
