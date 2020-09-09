const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  gearbox: String,
  ac: Boolean,
  seats: Number,
  type: String,
  color: String,
  year: Number,
  description: String,
  price: Object,
  location: Object,
  img: String,
});

module.exports = mongoose.model('Car', carSchema);
