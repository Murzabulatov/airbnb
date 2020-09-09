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
  deals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deal', default: [] }],
  cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car', default: [] }],
  admin: { type: Boolean, default: false },
  registrationDate: Date,
});

module.exports = mongoose.model('User', userSchema);
