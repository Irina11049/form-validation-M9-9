let form = document.querySelector('.order');
  let fullNameInput = document.getElementById('full-name');
  let usernameInput = document.getElementById('username');
  let mailInput = document.getElementById('mail');
  let passwordInput = document.getElementById('password');
  let repeatPasswordInput = document.getElementById('repeat-password');
  let checkboxInput = document.getElementById('checkbox-input');

  let linkAlreadyHaveAccount = document.querySelector('.order-active-text');
  let fullNameLabel = form.querySelector('label[for="full-name"]');
  let mailLabel = form.querySelector('label[for="mail"]');
  let repeatPasswordLabel = form.querySelector('label[for="repeat-password"]');
  let checkbox = document.getElementById('checkbox');

  let formTitle = form.querySelector('.order-title');
  let submitButton = document.getElementById('button');
  let popupOkButton = document.getElementById('popup-ok');

window.onload = function () {
  const regexFullName = /^[A-Za-zА-Яа-яЁё\s]+$/
  const regexUsername = /^[A-Za-z0-9_-]+$/
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=$$$${};':"\\|,.<>\/?]).{8,}$/

  fullNameInput.addEventListener('keypress', function (event) {
    if (event.key >= '0' && event.key <= '9') {
      event.preventDefault()
    }
  })

  //3
  usernameInput.addEventListener('keypress', function (event) {
    if (event.key === '.' || event.key === ',') {
      event.preventDefault()
    }
  })

  //4
  checkboxInput.addEventListener('change', function () {
    if (this.checked) {
      console.log('Согласен')
    } else {
      console.log('Не согласен')
    }
  })

  //5
  form.addEventListener('submit', function (event) {
    event.preventDefault()
    clearErrors()

    let valid = true

    // Проверка Full Name
    if (!fullNameInput.value.trim()) {
      showError(fullNameInput, 'Заполните поле Full Name')
      valid = false
    } else if (!regexFullName.test(fullNameInput.value.trim())) {
      showError(fullNameInput, 'Full Name может содержать только буквы и пробел')
      valid = false
    }

    // Проверка Username
    if (!usernameInput.value.trim()) {
      showError(usernameInput, 'Заполните поле Your username')
      valid = false
    } else if (!regexUsername.test(usernameInput.value.trim())) {
      showError(
        usernameInput,
        'Your username может содержать только буквы, цифры, _ и -'
      )
      valid = false
    }

    // Проверка Email
    if (!mailInput.value.trim()) {
      showError(mailInput, 'Заполните поле E-mail')
      valid = false
    } else if (!regexEmail.test(mailInput.value.trim())) {
      showError(mailInput, 'Некорректный формат E-mail')
      valid = false
    }

    // Проверка Password
    if (!passwordInput.value) {
      showError(passwordInput, 'Заполните поле Password')
      valid = false
    } else if (!regexPassword.test(passwordInput.value)) {
      showError(
        passwordInput,
        'Пароль должен быть минимум 8 символов, содержать минимум одну заглавную букву, цифру и спецсимвол'
      )
      valid = false
    }

    // Повтор пароля
    if (
      repeatPasswordInput.value !== passwordInput.value ||
      !repeatPasswordInput.value
    ) {
      showError(repeatPasswordInput, 'Пароли не совпадают')
      valid = false
    }

    // Проверка условия согласия
    if (!checkboxInput.checked) {
      showError(checkboxInput, 'Пожалуйста, подтвердите согласие')
      valid = false
    }

    if (!valid) return

    // Создаём пользователя
    const user = {
      fullName: fullNameInput.value.trim(),
      username: usernameInput.value.trim(),
      email: mailInput.value.trim(),
      password: passwordInput.value
    }

    // Берем существующих клиентов
    let clients = JSON.parse(localStorage.getItem('clients')) || []

    // Проверка уникальности email или username
    const exists = clients.some(
      u => u.email === user.email || u.username === user.username
    )
    if (exists) {
      alert('Пользователь с таким email или username уже зарегистрирован.')
      return
    }

    // Добавление нового пользователя
    clients.push(user)
    localStorage.setItem('clients', JSON.stringify(clients))

    // Показ модального окна
    showPopup()

    // Очистка формы
    form.reset()
  })

  // Вспомогательные функции
  function showError (inputEl, message) {
    inputEl.style.borderColor = 'tomato'
    const errorDiv = inputEl.nextElementSibling
    errorDiv.innerText = message
    errorDiv.style.display = 'block'
  }

  function clearErrors () {
    document.querySelectorAll('.error').forEach(div => {
      div.style.display = 'none'
      div.innerText = ''
    })
    document.querySelectorAll('input').forEach(input => {
      input.style.borderColor = ''
    })
  }
}

function showPopup () {
  let popup = document.getElementById('popup')
  popup.style.display = 'flex'

  // Обработчик кнопки ОК
  document.getElementById('popup-ok').onclick = function () {
    popup.style.display = 'none'
    form.reset()
  }
}

// Функция для перехода на страницу логина
function switchToLogin () {
  // Заменяем заголовок
  formTitle.textContent = 'Log in to the system'

  // Удаляем лишние поля и чекбокс
  if (fullNameLabel) {
    fullNameLabel.remove()
    fullNameInput.remove()
  }
  if (mailLabel) {
    mailLabel.remove()
    mailInput.remove()
  }
  if (repeatPasswordLabel) {
    repeatPasswordLabel.remove()
    repeatPasswordInput.remove()
  }
  if (checkbox) {
    checkbox.remove()
  }

  // Заменяем текст в кнопке на «Sign In»
  submitButton.textContent = 'Sign In'

  // Заменяем ссылку "Already have an account?"
  if (linkAlreadyHaveAccount) {
    linkAlreadyHaveAccount.textContent = 'Registration';
  }

  // Переназначаем обработчик для кнопки
  submitButton.onclick = function (e) {
    e.preventDefault()

    let usernameValue = document.getElementById('username').value.trim()
    let passwordValue = document.getElementById('password').value.trim()

    if (!usernameValue) {
      alert('Пожалуйста, введите имя пользователя.')
      document.getElementById('username').focus()
      return
    }
    if (!passwordValue) {
      alert('Пожалуйста, введите пароль.')
      document.getElementById('password').focus()
      return
    }

    alert(`Добро пожаловать, ${usernameValue}!`)
  }
}

// Обработчик для ссылки "Already have an account?"
if (linkAlreadyHaveAccount) {
  linkAlreadyHaveAccount.addEventListener('click', function (e) {
    e.preventDefault()
    switchToLogin()
  })
}

// Обработчик для кнопки «ОК» в попапе
if (popupOkButton) {
  popupOkButton.addEventListener('click', function () {
    let popup = document.getElementById('popup')
    if (popup) {
      popup.style.display = 'none'
    }
    switchToLogin()
  })
}
