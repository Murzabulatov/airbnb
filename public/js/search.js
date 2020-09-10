const formSearch = document.forms.formSearch;
let result = document.getElementById('result');
let resultArr = [];

formSearch.addEventListener('submit', callbackForm);

async function callbackForm(event) {
  event.preventDefault();

  const formSend = {
    brand: event.target.brand.value,
    model: event.target.model.value,
    type: event.target.type.value,
    year: event.target.year.value,
    gearbox: event.target.gearbox.value,
    seats: event.target.seats.value,
    ac: event.target.ac.value,
    price: event.target.price.value,
    color: event.target.color.value,
    location: carLocation?.geometry._coordinates,
    distance: event.target.distance.value,
  };
  // console.log(formSend);

  if (
    (formSend.location && formSend.distance === '') ||
    (!formSend.location && formSend.distance)
  ) {
    return alert('Укажите точку на карте и выберите дистанцию поиска (10-100)');
  }

  const response = await fetch('/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formSend),
  });

  let data = JSON.parse(await response.json());
  // data = JSON.parse(data);
  console.log(data);
  result.innerHTML = '';
  viewResult(data);
}

function viewResult(arrayOfCars) {
  console.log('viewResult', arrayOfCars);
  let resultHTML = '';
  if (resultArr.length) {
    for (let car of resultArr) {
      myMap.geoObjects.remove(car);
    }
  }

  for (let car of arrayOfCars) {
    let mapCar = new ymaps.Placemark(
      car.location,
      {
        balloonContent: `${car.brand} ${car.model} ${car.year}`,
      },
      {
        preset: 'islands#circleIcon',
        iconColor: '#32CD32',
      }
    );

    resultArr.push(mapCar);
    myMap.geoObjects.add(mapCar);

    resultHTML += `<div>${car.brand}<br>
    ${car.model}<br>
    ${car.gearbox}<br>
    ${car.ac}<br>
    ${car.seats}<br>
    ${car.type}<br>
    ${car.color}<br>
    ${car.year}<br>
    ${car.description}<br>
    ${car.price}<br>
    ${car.img}</div>\n`;
  }

  result.innerHTML = resultHTML;
}

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', (event) => {
  myMap.geoObjects.remove(carLocation);
});
