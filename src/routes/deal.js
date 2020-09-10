const express = require('express');

const router = express.Router();
require('dotenv').config();
// const User = require('../models/user');
const Car = require('../models/car');

router
  .route('/new/:idCar')
  .get(async (req, res) => {
    const carIn = await Car.find({_id: req.params.idCar}).exec();
    const {brand, model, gearbox, ac, seats,type, color, year, description ,price} = carIn[0];
    const {day, week, month } = price;
    console.log(req.params.idCar);
    console.log(day);
    res.render('deal', {brand, model, gearbox, ac, seats, type, color, year, description, day, week, month});
  });
//
module.exports = router;
