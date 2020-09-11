// ymaps.ready(init);
// let myMap;

// function init() {
//   myMap = new ymaps.Map(
//     'map',
//     {
//       center: [57.5262, 38.3061], // Углич
//       zoom: 11,
//     },
//     {
//       balloonMaxWidth: 200,
//       searchControlProvider: 'yandex#search',
//     }
//   );

//   let car = new ymaps.Placemark(
//     [57.5262, 38.3061],
//     {
//       balloonContent: 'car',
//     },
//     {
//       preset: 'islands#circleIcon',
//       iconColor: '#3caa3c',
//     }
//   );
//   myMap.geoObjects.add(car);
//   // Обработка события, возникающего при щелчке
//   // левой кнопкой мыши в любой точке карты.
//   // При возникновении такого события откроем балун.
//   myMap.events.add('click', function (e) {
//     console.log(e.get('coords'));

//     myMap.geoObjects.remove(car);

//     car = new ymaps.Placemark(
//       e.get('coords'),
//       {
//         balloonContent: 'car',
//       },
//       {
//         preset: 'islands#circleIcon',
//         iconColor: '#3caa3c',
//       }
//     );

//     myMap.geoObjects.add(car);
//   });
// }

let date1 = new Date('1995-12-15T03:24:00');
let date2 = new Date('1995-12-17T03:24:00');
console.log(date1, date2);
console.log(date1 - date2);

for (let iter = date1.valueOf(); iter <= date2.valueOf(); iter += 86400000) {
  let tempData = new Date(iter);

  console.log(
    `${tempData.getFullYear()}/${tempData.getMonth()}/${tempData.getDay()}`
  );
}
