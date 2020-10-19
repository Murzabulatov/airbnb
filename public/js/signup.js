const newUserForm = document.getElementById('signup');

newUserForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const {
    username: { value: username },
    password: { value: password },
    corpassword: { value: corpassword },
  } = event.target;

  if (username.length >= 4 && password.length >= 4) {
    if (password === corpassword) {
      const body = {
        username,
        password,
      };
      const response = await fetch('/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      // window.location.assign('/profile');
      // eslint-disable-next-line no-undef
      window.location.assign('/');
    } else {
      newUserForm.insertAdjacentHTML('afterend', 'Заполните форму корректно!');
    }
  } else {
    newUserForm.insertAdjacentHTML('afterend', 'Заполните форму корректно!');
  }
});
