const express = require('express');
const Car = require('../models/car.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.render('search', { isSearch: true });
  })
  .post(async (req, res) => {
    // const { brand, model, type, year, gearbox, seats, ac, color } = req.body;
    console.log(req.body);

    let objSearch = {};
    for (const reqKey in req.body) {
      if (
        /например|выберите/i.test(req.body[reqKey]) ||
        req.body[reqKey] === ''
      ) {
        // ничего не делаем
      } else if (typeof req.body[reqKey] === 'boolean') {
        objSearch[reqKey] = req.body[reqKey];
      } else if (reqKey === 'price') {
        // сложная логика
        const regEx = /\d+/gmi;
        const priceArr = req.body[reqKey].match(regEx);
        //console.log(priceArr);

        const priceStart = Number(priceArr[0]);
        const priceEnd = Number(priceArr[1]);

        console.log(priceStart, priceEnd);
        console.log('THIS IS PRICE');

        objSearch["price.day"] = { $gte: priceStart, $lte: priceEnd }

      } else {
        objSearch[reqKey] = new RegExp(req.body[reqKey], 'i');
      }
    }



    console.log(objSearch);



    try {
      const foundCars = await Car.find(objSearch);

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
    } catch (err) {
      return res.render('search', { errors: [err] });
    }
  });

module.exports = router;
