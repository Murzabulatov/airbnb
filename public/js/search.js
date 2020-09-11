const formSearch = document.forms.formSearch;
let result = document.getElementById('result');
let resultArr = [];

const translator = {
  'Sedan': 'Седан',
  'Passenger Van': 'Мини-фургон',
  'SUV': 'Внедорожник',
  'Wagon': 'Универсал',
  'Minivan': 'Минивэн',
  'Crew Cab Pickup': 'Пикап',
  'Extended Cab Pickup': 'Грузовой фургон',
  'Hatchback': 'Хэтчбек',
  'Сrossover': 'Кроссовер',
  'Coupe': 'Купе',
  'Cargo Van': 'Грузовой фургон',
  'Cabriolet': 'Кабриолет',
  'automatic': 'АКПП',
  'manual': 'МКПП',
  'true': 'Установлена',
  'false': 'Отсутствует',
  'black': 'Черный',
  'white': 'Белый',
  'grey': 'Серый',
  'green': 'Зеленый',
  'red': 'Красный',
  'blue': 'Синий',
  'yellow': 'Желтый',
  'pink': 'Розовый',
  'plum': 'Сливовый',
  'magenta': 'Пурпурный',
  'cyan': 'Бирюзовый',
  'violet': 'Фиолетовый',
  'olive': 'Оливковый',
  'tan': 'Рыжий',
  'sky blue': 'Небесно голубой',
  'teal': 'Голубой',
  'ivory': 'Цвет слоновой кости',
  'lime': 'Липовый цвет',
  'azure': 'Голубой',
  'indigo': 'Цвет индиго',
}

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

  if (arrayOfCars[0] !== 'nothing') {
    for (let car of arrayOfCars) {
      let mapCar = new ymaps.Placemark(
        car.location,
        {
          balloonContent: `${car.brand} ${car.model}, ${car.year}
          <br>от ${car.price.month} руб/день`,
        },
        {
          preset: 'islands#circleIcon',
          iconColor: '#0000FF',
        }
      );

      resultArr.push(mapCar);
      myMap.geoObjects.add(mapCar);


      if (car.login === true) {
        resultHTML += `
        <hr>
        <dl class="row">
          <dt class="col-sm-5">
          <h2>${car.brand} ${car.model}</h2>
          <div id="user-avatar" class="mr-3">
              <img id="carpic" src="https://www.meme-arsenal.com/memes/19f1d0627b84eed4a5a08878ce684b2f.jpg" alt="userpic">
            </div>
          </dt>
          <dd class="col-sm-7">
            <dl class="row">
              <dt class="col-sm-4"> <br><br>Год выпуска:</dt>
              <dd class="col-sm-8"><br><br>${car.year}</dd>
            </dl>
      
            <dl class="row">
              <dt class="col-sm-4">Тип кузова:</dt>
              <dd class="col-sm-8">${translator[car.type]}</dd>
            </dl>
      
            <dl class="row">
              <dt class="col-sm-4">Коробка передач:</dt>
              <dd class="col-sm-8">${translator[car.gearbox]}</dd>
            </dl>  
    
            <dl class="row">
              <dt class="col-sm-4">Кол-во мест:</dt>
              <dd class="col-sm-8">${car.seats}</dd>
            </dl>
    
            <dl class="row">
              <dt class="col-sm-4">Система кондиционирования:</dt>
              <dd class="col-sm-8">${translator[car.ac]}</dd>
            </dl>
    
            <dl class="row">
              <dt class="col-sm-4">Цвет:</dt>
              <dd class="col-sm-8">${translator[car.color]}</dd>
            </dl>
    
            <dl class="row">
              <dt class="col-sm-4">Цена:</dt>
              <dd class="col-sm-8">
              ${car.price.day} руб/день <br>
              ${car.price.week} руб/неделя <br>
              ${car.price.month} руб/месяц <br>
              </dd>
            </dl>
    
          </dd>
        </dl>
    
        <dl class="row">
        <dt class="col-sm-4 opisanie">
        <br>Описание:</dt>
        <dd class="col-sm-8"><br>${car.description}</dd>
        <br>
        <div class="col-md-12 form-row d-flex flex-row align-items-center justify-content-center">
          <div>
        <form method="GET" action="/deal/new/${car._id}">
        <button type="submit" class="btn btn-primary btn-lg"> Забронировать </button>
        </form>
          </div>
        </div>
        </dl>
  
        `;

      } else {
        resultHTML += `
        <hr>
        <dl class="row">
          <dt class="col-sm-5">
          <h2>${car.brand} ${car.model}</h2>
          <div id="user-avatar" class="mr-3">
              <img id="userpic" src="https://www.meme-arsenal.com/memes/19f1d0627b84eed4a5a08878ce684b2f.jpg" alt="userpic"
                width="400px" height="400px">
            </div>
          </dt>
          <dd class="col-sm-7">
            <dl class="row">
              <dt class="col-sm-4"> <br><br>Год выпуска:</dt>
              <dd class="col-sm-8"><br><br>${car.year}</dd>
            </dl>
      
            <dl class="row">
              <dt class="col-sm-4">Тип кузова:</dt>
              <dd class="col-sm-8">${translator[car.type]}</dd>
            </dl>
      
            <dl class="row">
              <dt class="col-sm-4">Коробка передач:</dt>
              <dd class="col-sm-8">${translator[car.gearbox]}</dd>
            </dl>  
    
            <dl class="row">
              <dt class="col-sm-4">Кол-во мест:</dt>
              <dd class="col-sm-8">${car.seats}</dd>
            </dl>
    
            <dl class="row">
              <dt class="col-sm-4">Система кондиционирования:</dt>
              <dd class="col-sm-8">${translator[car.ac]}</dd>
            </dl>
    
            <dl class="row">
              <dt class="col-sm-4">Цвет:</dt>
              <dd class="col-sm-8">${translator[car.color]}</dd>
            </dl>
    
            <dl class="row">
              <dt class="col-sm-4">Цена:</dt>
              <dd class="col-sm-8">
              ${car.price.day} руб/день <br>
              ${car.price.week} руб/неделя <br>
              ${car.price.month} руб/месяц <br>
              </dd>
            </dl>
    
          </dd>
        </dl>
    
        <dl class="row">
        <dt class="col-sm-4 opisanie">
        <br>Описание:</dt>
        <dd class="col-sm-8"><br>${car.description}</dd>
        </dl>
        
        `;
      }
    }
  } else {
    resultHTML = `<h2>Машины не найдены. Попробуйте изменить параметры поиска`
  }


  result.innerHTML = resultHTML;
}

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', (event) => {
  myMap.geoObjects.remove(carLocation);
});
