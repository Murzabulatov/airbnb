const form = document.getElementById('form');

form.addEventListener('submit', callbackSubmit);

async function callbackSubmit(event) {
  event.preventDefault();
  const {
    method,
    action,
    brand: { value: brand },
    model: { value: model },
    gearbox: { value: gearbox },
    ac: { value: ac },
    seats: { value: seats },
    type: { value: type },
    color: { value: color },
    year: { value: year },
  } = event.target;

  if (!carLocation) {
    return alert('Укажите на карте место стоянки авто.');
  }

  await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      brand,
      model,
      gearbox,
      ac,
      seats,
      type,
      color,
      year,
      location: carLocation.geometry._coordinates,
    }),
  });

  // return window.location.assign('/search');
}
