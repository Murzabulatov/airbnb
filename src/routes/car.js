/* eslint-disable no-underscore-dangle */
const express = require('express');

const router = express.Router();
require('dotenv').config();
const isAuthMiddlewear = require('../middlewears/isAuth');
const User = require('../models/user');
const Car = require('../models/car');

router
  .route('/new')
  .get(isAuthMiddlewear, (req, res) => {
    res.render('car/new', { yandexAPI: process.env.API, carNew: true });
  })
  .post(isAuthMiddlewear, async (req, res) => {
    const carNew = new Car(req.body);
    await carNew.save();

    await User.findByIdAndUpdate(req.session.user.id, {
      $push: { cars: carNew._id },
    });

    res.end();
  });

module.exports = router;
