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
    priceDay: { value: priceDay },
    priceWeek: { value: priceWeek },
    priceMonth: { value: priceMonth },
    description: { value: description },
  } = event.target;

  if (!carLocation) {
    return alert('Укажите на карте место стоянки авто.');
  }

  let data = {
    brand,
    model,
    gearbox,
    ac,
    seats,
    type,
    color,
    year,
    description,
    price: {
      day: Number(priceDay),
      week: Number(priceWeek),
      month: Number(priceMonth),
    },
    location: carLocation.geometry._coordinates,
  };

  for (let key in data) {
    if (data[key] === '' || /например|выберите/i.test(data[key])) {
      return alert('Заполните все поля.');
    }
  }

  await fetch(action, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  // return window.location.assign('/search');
}
