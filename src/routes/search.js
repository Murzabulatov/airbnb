const express = require('express');
const Car = require('../models/car.js');

const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('search', { isSearch: true });
  })
  .post(async (req, res) => {
    const {
      brand,
      model,
      type,
      year,
      gearbox,
      seats,
      ac,
      color,
    } = req.body;


    let objSearch = {};
    for (let reqKey in req.body) {
      console.log(reqKey, typeof req.body[reqKey]);
      if (reqKey === 'ac') {
        objSearch[reqKey] = (req.body[reqKey]);
      } else {
        if (req.body[reqKey].includes('например') || req.body[reqKey].includes('Выберите')) {
          objSearch[reqKey] = '';
        } else {
          objSearch[reqKey] = (req.body[reqKey]);
        }
      }

    }

    // console.log(req.body);
    console.log(objSearch);

    try {
      const foundCars = await Car.find({
        brand: new RegExp(objSearch.brand, 'i'),
        model: new RegExp(objSearch.model, 'i'),
        type: objSearch.type,
        // year: objSearch.year,
        // gearbox: objSearch.gearbox,
        // seats: objSearch.seats,
        // ac: objSearch.ac,
        // color: objSearch.color,
      }).exec();

      console.log(foundCars);
      // const currentGame = await Game.findById(gameId);
      // const currentDeck = await Deck.findById(currentGame.deck).populate('cards');
      // let currentTrueAnswer = await Card.findById(currentAnswerId);

      // if (currentAnswerId) currentTrueAnswer = currentTrueAnswer.answer;

      // res.json({
      //   currentGame,
      //   currentDeck,
      //   currentTrueAnswer,
      // });

      return res.render('search', { isSearch: true });
    }
    catch (err) {
      return res.render('search', { errors: [err] });
    }
  });

module.exports = router;
