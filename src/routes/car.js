const express = require('express');
const router = express.Router();
require('dotenv').config();
const User = require('../models/user');
const Car = require('../models/car');

router.get('/new', (req, res) => {
  res.render('car/new', { yandexAPI: process.env.API });
});
router.post('/new', async (req, res) => {
  const carNew = new Car(req.body);
  await carNew.save();

  await User.findByIdAndUpdate(req.session.user, {
    $push: { cars: carNew._id },
  });
  // const {
  //   brand,
  //   model,
  //   gearbox,
  //   ac,
  //   seats,
  //   type,
  //   color,
  //   year,
  //   description,
  //   price,
  //   location,
  //   img,
  // } = req.body;

  // res.redirect('search');
});

module.exports = router;
