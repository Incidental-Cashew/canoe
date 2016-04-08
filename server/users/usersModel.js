var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },

  uberToken: {
    type: String,
    required: true
  },


  lyftToken: {
    type: String,
    required: true
  },


});

module.exports = mongoose.model('users', UserSchema);