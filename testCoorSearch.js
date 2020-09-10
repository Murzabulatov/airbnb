const dbConnect = require('./dbConnect.js');
const Car = require('./src/models/car');
dbConnect();

// dist = 20 #дистанция 20 км
// mylon = 51.5289156201 # долгота центра
// mylat = 46.0209384922 # широта
// lon1 = mylon-dist/abs(math.cos(math.radians(mylat))*111.0) # 1 градус широты = 111 км
// lon2 = mylon+dist/abs(math.cos(math.radians(mylat))*111.0)
// lat1 = mylat-(dist/111.0)
// lat2 = mylat+(dist/111.0)
// profiles = UserProfile.objects.filter(lat__range=(lat1, lat2)).filter(lon__range=(lon1, lon2))

async function cars() {
  let cars = await Car.find();
  return cars.filter((car) => car.location.length);
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

async function test(center, distance) {
  // center = [xx.xxxx,yy.yyyy]
  let carsArray = await cars();
  let lon1 =
    center[0] - distance / Math.abs(Math.cos(degToRad(center[1])) * 111.0); // 1 градус широты = 111 км
  let lon2 =
    center[0] + distance / Math.abs(Math.cos(degToRad(center[1])) * 111.0);

  let lat1 = center[1] - distance / 111.0;
  let lat2 = center[1] + distance / 111.0;

  console.log('---', lon1, lon2);
  console.log('+++', lat1, lat2);

  let filter1 = carsArray.filter((car) => {
    return car.location[0] > lon1 && car.location[0] < lon2;
  });
  let filter2 = filter1.filter((car) => {
    // console.log('==-', car.location[1] > lat1);
    // console.log('==+', car.location[1], '<', lat1, car.location[1] < lat1);

    return car.location[1] > lat1 && car.location[1] < lat2;
  });

  //console.log('filter1', filter1);
  console.log('filter2', filter2);
}
test([55.753215, 37.622504], 4);
