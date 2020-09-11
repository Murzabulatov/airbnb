const express = require('express');

const router = express.Router();
require('dotenv').config();
// const User = require('../models/user');
const Car = require('../models/car');
const Deal = require('../models/deal');

router
  .route('/new/:idCar')
  .get(async (req, res) => {
    const carIn = await Car.findByIdAndUpdate(req.params.idCar);
    const {
      brand,
      model,
      gearbox,
      ac,
      seats,
      type,
      color,
      year,
      description,
      price,
    } = carIn;
    const { day, week, month } = price;
    console.log('idCar', req.params.idCar);
    console.log(model);
    res.render('deal', {
      brand,
      model,
      gearbox,
      ac,
      seats,
      type,
      color,
      year,
      description,
      day,
      week,
      month,
      deal: true,
    });
  })
  .post(async (req, res) => {
    let arrayOfDeal = await Deal.find(
      { car: req.params.idCar },
      { rentStart: 1, rentStop: 1 }
    );
    console.log('arrayOfDeal', arrayOfDeal);
    let arrayOfDates = [];

    arrayOfDeal.forEach((deal) => {
      if (deal.rentStart && deal.rentStop) {
        for (
          let iter = deal.rentStart.valueOf();
          iter <= deal.rentStop.valueOf();
          iter += 86400000
        ) {
          let tempData = new Date(iter);
          console.log('tempData', tempData);
          // arrayOfDates.push(
          //   `${tempData.getFullYear()}/${tempData.getMonth()}/${tempData.getDay()}`
          // );
          arrayOfDates.push(tempData);
        }
      }
    });

    res.json(JSON.stringify(arrayOfDates));
  });
//
module.exports = router;
