const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
  },
  deals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deal' }],
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
  admin: Boolean,
  registrationDate: Date,
});

module.exports = mongoose.model('User', userSchema);
