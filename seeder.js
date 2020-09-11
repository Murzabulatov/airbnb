const dbConnect = require('./dbConnect.js');
const faker = require('faker');
const Car = require('./src/models/car');
const Deal = require('./src/models/deal');
const User = require('./src/models/user');

dbConnect();

const gearbox = ['manual', 'automatic'];

function randomInteger(min, max) {
  // случайное число от min до (max+1)
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// async function seeder() {
//   for (let index = 0; index < 20; index += 1) {
//     const priceDay = randomInteger(1000, 5000);
//     let car = new Car({
//       brand: faker.vehicle.manufacturer(),
//       model: faker.vehicle.model(),
//       gearbox: gearbox[randomInteger(0, 1)],
//       ac: String(faker.random.boolean()),
//       seats: String(randomInteger(2, 7)),
//       type: faker.vehicle.type(),
//       color: faker.vehicle.color(),
//       year: String(randomInteger(1980, 2020)),
//       description: faker.commerce.productDescription(),
//       price: {
//         day: priceDay,
//         week: Math.floor(priceDay * 0.9),
//         month: Math.floor(priceDay * 0.8),
//       },
//     });

//     await car.save();
//   }
// }

// seeder();
let carsArray = [];
async function deals() {
  for (let index = 0; index < 20; index += 1) {
    const priceDay = randomInteger(1000, 5000);
    let car1 = new Car({
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      gearbox: gearbox[randomInteger(0, 1)],
      ac: String(faker.random.boolean()),
      seats: String(randomInteger(2, 7)),
      type: faker.vehicle.type(),
      color: faker.vehicle.color(),
      year: String(randomInteger(1980, 2020)),
      description: faker.commerce.productDescription(),
      price: {
        day: priceDay,
        week: Math.floor(priceDay * 0.9),
        month: Math.floor(priceDay * 0.8),
      },
      location: [
        Number('55.' + String(randomInteger(1, 99999999999999))),
        Number('37.' + String(randomInteger(1, 99999999999999))),
      ],
    });
    carsArray.push(car1);
    await car1.save();
  }

  let deal1 = new Deal({
    donor: '5f5b76b6ee1b043eae5bef21', // сюда впишите id своих юзеров, т.к. автоматически создавать аккаунты с паролем не умею
    recipient: '5f5b77d47197d90ecba2681a', // сюда тоже
    car: carsArray[0],
    signingDate: new Date('2020-09-05T03:24:00'),
    rentStart: new Date('2020-09-15T03:24:00'),
    rentStop: new Date('2020-09-26T03:24:00'),
  });
  await deal1.save();

  let deal2 = new Deal({
    donor: '5f5b76cdee1b043eae5bef22', // сюда впишите id своих юзеров, т.к. автоматически создавать аккаунты с паролем не умею
    recipient: '5f5b77e17197d90ecba2681b', // сюда тоже
    car: carsArray[4],
    signingDate: new Date('2020-09-06T03:24:00'),
    rentStart: new Date('2020-10-15T03:24:00'),
    rentStop: new Date('2020-10-30T03:24:00'),
  });
  await deal2.save();

  let deal3 = new Deal({
    donor: '5f5b76e9ee1b043eae5bef23', // сюда впишите id своих юзеров, т.к. автоматически создавать аккаунты с паролем не умею
    recipient: '5f5b77ec7197d90ecba2681c', // сюда тоже
    car: carsArray[6],
    signingDate: new Date('2020-09-01T03:24:00'),
    rentStart: new Date('2020-11-01T03:24:00'),
    rentStop: new Date('2020-11-25T03:24:00'),
  });
  await deal3.save();

  let deal4 = new Deal({
    donor: '5f5b76fbee1b043eae5bef24', // сюда впишите id своих юзеров, т.к. автоматически создавать аккаунты с паролем не умею
    recipient: '5f5b78828194bb0fcce41dd0', // сюда тоже
    car: carsArray[8],
    signingDate: new Date('2020-09-01T03:24:00'),
    rentStart: new Date('2020-11-01T03:24:00'),
    rentStop: new Date('2020-11-25T03:24:00'),
  });
  await deal4.save();
}

deals();
