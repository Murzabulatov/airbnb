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

async function seeder() {
  for (let index = 0; index < 20; index += 1) {
    const priceDay = randomInteger(1000, 5000);
    let car = new Car({
      brand: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      gearbox: gearbox[randomInteger(0, 1)],
      ac: faker.random.boolean(),
      seats: randomInteger(2, 7),
      type: faker.vehicle.type(),
      color: faker.vehicle.color(),
      year: randomInteger(1980, 2020),
      description: faker.commerce.productDescription(),
      price: {
        day: priceDay,
        week: Math.floor(priceDay * 0.9),
        month: Math.floor(priceDay * 0.8),
      },
    });

    await car.save();
  }
}

seeder();
