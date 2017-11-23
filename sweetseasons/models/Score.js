const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pointsSchema = new Schema({

  recipe: {
    type: Schema.Types.ObjectId,
    ref: 'Recipe'
  },

  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],

  result: [{
    type: Number,
    score: 0
  },{
    pic: {type: String, default: ''}
  },{
    timestamps: {createdAt: 'created_at'}
  }]
  
});

module.exports = mongoose.model('Point', pointsSchema);
