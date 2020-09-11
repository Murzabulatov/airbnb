const express = require('express');
const Car = require('../models/car.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.render('search', { isSearch: true, yandexAPI: process.env.API });
  })
  .post(async (req, res) => {
    let objSearch = {};
    for (const reqKey in req.body) {
      if (
        /например|выберите/i.test(req.body[reqKey]) ||
        req.body[reqKey] === '' ||
        reqKey === 'location' ||
        reqKey === 'distance'
      ) {
        // ничего не делаем
      } else if (typeof req.body[reqKey] === 'boolean') {
        objSearch[reqKey] = req.body[reqKey];
      } else if (reqKey === 'price') {
        // сложная логика
        const regEx = /\d+/gim;
        const priceArr = req.body[reqKey].match(regEx);
        const priceStart = Number(priceArr[0]);
        const priceEnd = Number(priceArr[1]);

        objSearch['price.day'] = { $gte: priceStart, $lte: priceEnd };
      } else {
        objSearch[reqKey] = new RegExp(req.body[reqKey], 'i');
      }
    }

    let foundCars = await Car.find(objSearch).lean(); // БЕЗ LEAN не записывает новые поля к элементам массива (см)
    // Если результат поиска пустой - останавливаем работу.
    //  if (foundCars.length === 0) return res.end();

    // YANDEX.MAP
    if (req.body.location?.length && req.body.distance.length) {
      foundCars = findCarsWithLoc(
        req.body.location,
        Number(req.body.distance),
        foundCars
      );
      // console.log('findCarsWithLoc', foundCars);
    }
    // console.log('==result==', foundCars);

    for (let car of foundCars) {
      if (res.locals.username) {
        car.login = true;
      } else {
        car.login = false;
      }
    }
    if (foundCars.length) {
      return res.json(JSON.stringify(foundCars));
    } else {
      return res.json(JSON.stringify(['nothing']));
    }
  });

// ФУНКЦИИ
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function findCarsWithLoc(center, distance, arrayOfCars) {
  return arrayOfCars.filter((car) => {
    return (
      latlng2distance(center[0], center[1], car.location[0], car.location[1]) <
      distance
    );
  });
}

function latlng2distance(lat1, long1, lat2, long2) {
  //радиус Земли
  var R = 6372795;
  //перевод коордитат в радианы
  lat1 *= Math.PI / 180;
  lat2 *= Math.PI / 180;
  long1 *= Math.PI / 180;
  long2 *= Math.PI / 180;
  //вычисление косинусов и синусов широт и разницы долгот
  var cl1 = Math.cos(lat1);
  var cl2 = Math.cos(lat2);
  var sl1 = Math.sin(lat1);
  var sl2 = Math.sin(lat2);
  var delta = long2 - long1;
  var cdelta = Math.cos(delta);
  var sdelta = Math.sin(delta);
  //вычисления длины большого круга
  var y = Math.sqrt(
    Math.pow(cl2 * sdelta, 2) + Math.pow(cl1 * sl2 - sl1 * cl2 * cdelta, 2)
  );
  var x = sl1 * sl2 + cl1 * cl2 * cdelta;
  var ad = Math.atan2(y, x);
  var dist = (ad * R) / 1000; //расстояние между двумя координатами в метрах
  return dist;
}

module.exports = router;
