const express = require('express');
const Car = require('../models/car.js');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.render('search', { isSearch: true, yandexAPI: process.env.API });
  })
  .post(async (req, res) => {
    // const { brand, model, type, year, gearbox, seats, ac, color } = req.body;
    console.log('ПРИШЛО ОТ КЛИЕНТА', req.body);
    //  let locationReq = req.body.location;
    let distanceReq = req.body.distance;
    // console.log('>>>>>>>>>', locationReq);
    // console.log('<<<<<<<<', distanceReq);

    let objSearch = {};
    for (const reqKey in req.body) {
      if (
        /например|выберите/i.test(req.body[reqKey]) ||
        req.body[reqKey] === '' || reqKey === 'location' || reqKey === 'distance'
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

        objSearch["price.day"] = { $gte: priceStart, $lte: priceEnd }

      } else {
        objSearch[reqKey] = new RegExp(req.body[reqKey], 'i');
      }
    }

    console.log(objSearch);

    try {
      const foundCars = await Car.find(objSearch);
      // console.log(foundCars);
      console.log('FOUND CARS', foundCars);

      // YANDEX.MAP


      // ВСЁ РАБОТАЕТ, но РАЗНИЦА В ЗАПИСИ строчки PRICE : "number" or "string"




      if (distanceReq.length) { // ОШИБКА БЫЛА ЗДЕСЬ В УСЛОВИИ 
        const carsAJAX = await findCarsWithLoc(
          req.body.location, Number(req.body.distance), foundCars
        );
        console.log(carsAJAX);
        res.json({ array: carsAJAX });
        return;
      }

      res.json({ array: foundCars });
      return;
    } catch (err) {
      return res.render('search', { errors: [err] });
    }
  });



// ФУНКЦИИ 

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

async function findCarsWithLoc(center, distance, carsArray) {
  // center = [xx.xxxx,yy.yyyy]
  let lon1 =
    center[0] - distance / Math.abs(Math.cos(degToRad(center[1])) * 111.0); // 1 градус широты = 111 км
  let lon2 =
    center[0] + distance / Math.abs(Math.cos(degToRad(center[1])) * 111.0);

  let lat1 = center[1] - distance / 111.0;
  let lat2 = center[1] + distance / 111.0;

  console.log('---', lon1, lon2);
  console.log('+++', lat1, lat2);

  carsArray = carsArray.filter((car) => {
    return car.location[0] > lon1 && car.location[0] < lon2;
  });
  carsArray = carsArray.filter((car) => {
    // console.log('==-', car.location[1] > lat1);
    // console.log('==+', car.location[1], '<', lat1, car.location[1] < lat1);

    return car.location[1] > lat1 && car.location[1] < lat2;
  });

  // console.log('filter2', carsArray);
  console.log('ФУНКЦИЯ С ЛОКЕЦШН', carsArray);
  return carsArray;
}

module.exports = router;
