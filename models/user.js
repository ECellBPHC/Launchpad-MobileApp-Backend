const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  college: {
    type: String,
    required: true
  },
  tickets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ticket'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);