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
});
