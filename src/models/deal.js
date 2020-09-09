const mongoose = require('mongoose');

const dealSchema = new mongoose.Schema({
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car' },
  signingDate: Date,
  rentStart: Date,
  rentStop: Date,
});

dealSchema.methods.sum = function () {
  const duration = Math.round((this.rentStop - this.rentStart) / 86400000);

  if (duration > 30) {
    return duration * this.price.month;
  }
  if (duration > 6) {
    return duration * this.price.week;
  }
  return duration * this.price.day;
};

module.exports = mongoose.model('Deal', dealSchema);
