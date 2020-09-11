const editForm = document.getElementById('profileEdit');

editForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const {
    firstName: { value: firstName },
    lastName: { value: lastName },
    birthDate: { value: birthDate },
    phone: { value: phone },
    email: { value: email },
  } = event.target;

  const body = {
    firstName,
    lastName,
    birthDate,
    phone,
    email,
  };

  const response = await fetch('/profile/edit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  response.json().then((data) => {
    if (data.message) {
      editForm.insertAdjacentHTML('beforeend', `<h2 class="my-2">${data.message}</h2>`);
      window.location.href = '/profile';
    }
    if (data.error) {
      editForm.insertAdjacentHTML('beforeend', `<h2 class="my-2">${data.error}</h2>`);
    }
  });
});
