function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

async function test(center, distance) {
  // center = [xx.xxxx,yy.yyyy]
  const carsArray = await cars();
  const lon1 = center[0] - distance / Math.abs(Math.cos(degToRad(center[1])) * 111.0);
  // 1 градус широты = 111 км
  const lon2 = center[0] + distance / Math.abs(Math.cos(degToRad(center[1])) * 111.0);

  const lat1 = center[1] - distance / 111.0;
  const lat2 = center[1] + distance / 111.0;

  const filter1 = carsArray.filter((car) => car.location[0] > lon1 && car.location[0] < lon2);
  const filter2 = filter1.filter((car) => car.location[1] > lat1 && car.location[1] < lat2);
}
test([55.753215, 37.622504], 4);
