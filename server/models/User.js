const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  favorites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PetName'
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema); 