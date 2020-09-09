const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  gearbox: String,
  ac: String,
  seats: String,
  type: String,
  color: String,
  year: String,
  description: String,
  price: Object,
  location: Array,
  img: String,
});

module.exports = mongoose.model('Car', carSchema);
