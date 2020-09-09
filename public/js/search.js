console.log('search_page');

const formSearch = document.forms.formSearch;

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
    color: event.target.color.value,
  };
  console.log(formSend);

  const response = await fetch('/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formSend),
  });

  const data = await response.json();
  console.log(data);
}

// async function start() {
//   const response = await fetch('/game', {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     headers: {
//       'Content-Type': 'application/json',
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify({
//       gameId,
//     }),
//   });

//   const {
//     currentGame,
//     currentDeck,
//   } = await response.json();

//   homeLink.href = `/profile/${currentGame.user}`;

//   if (currentGame.counterTrueAnswer.length < currentDeck.cards.length) {
//     for (const card of currentDeck.cards) {
//       if (!currentGame.counterTrueAnswer.includes(card._id)) {
//         questionString.innerText = card.question;
//         answerForm.name = card._id;
//         break;
//       }
//     }
//   } else {
//     window.location.href = `/profile/${currentGame.user}`;
//   }
// }
