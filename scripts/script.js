document.addEventListener('DOMContentLoaded', function () {
  // Элементы формы
  const form = document.getElementById('order')

  // Input элементы
  const fullNameInput = document.querySelector('#full-name input')
  const usernameInput = document.querySelector('#username input')
  const mailInput = document.querySelector('#mail input')
  const passwordInput = document.querySelector('#password input')
  const repeatPasswordInput = document.querySelector('#repeat-password input')
  const checkboxInput = document.getElementById('checkbox-input')

  // Контейнеры полей (label)
  const fullNameLabel = document.getElementById('full-name')
  const usernameLabel = document.getElementById('username')
  const mailLabel = document.getElementById('mail')
  const passwordLabel = document.getElementById('password')
  const repeatPasswordLabel = document.getElementById('repeat-password')
  const checkboxLabel = document.getElementById('checkbox-label')

  // Элементы ошибок
  const errorFullName = document.getElementById('error-full-name')
  const errorUsername = document.getElementById('error-username')
  const errorMail = document.getElementById('error-mail')
  const errorPassword = document.getElementById('error-password')
  const errorRepeatPassword = document.getElementById('error-repeat-password')
  const errorCheckbox = document.getElementById('error-checkbox')

  // Текстовые элементы
  const linkAlreadyHaveAccount = document.querySelector('.order-active-text')
  const formTitle = document.querySelector('.order-title')
  const submitButton = document.getElementById('button')
  const popupOkButton = document.getElementById('popup-ok')

  // Регулярные выражения
  const regexFullName = /^[A-Za-zА-Яа-яЁё\s]+$/
  const regexUsername = /^[A-Za-z0-9_-]+$/
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  const regexPassword =
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>\/?]).{8,}$/

  // Состояние формы
  let isLoginMode = false

  // Инициализация
  initializeEventListeners()

  function initializeEventListeners () {
    // Блокировка цифр в поле Full Name
    if (fullNameInput) {
      fullNameInput.addEventListener('keypress', function (event) {
        if (event.key >= '0' && event.key <= '9') {
          event.preventDefault()
        }
      })
    }

    // Обработчики ввода для скрытия ошибок
    if (fullNameInput) {
      fullNameInput.addEventListener('input', function () {
        hideError(fullNameLabel)
      })
    }

    if (usernameInput) {
      usernameInput.addEventListener('input', function () {
        hideError(usernameLabel)
      })
    }

    if (mailInput) {
      mailInput.addEventListener('input', function () {
        hideError(mailLabel)
      })
    }

    if (passwordInput) {
      passwordInput.addEventListener('input', function () {
        hideError(passwordLabel)
        hideError(repeatPasswordLabel)
      })
    }

    if (repeatPasswordInput) {
      repeatPasswordInput.addEventListener('input', function () {
        hideError(repeatPasswordLabel)
      })
    }

    if (checkboxInput) {
      checkboxInput.addEventListener('change', function () {
        hideError(checkboxLabel)
      })
    }
  }

  // Вспомогательные функции для ошибок
  function showError (labelElement, errorElement) {
    if (!labelElement || !errorElement) return

    errorElement.style.display = 'block'
    labelElement.classList.add('label-error')
  }

  function hideError (labelElement) {
    if (!labelElement) return

    const errorElement = labelElement.querySelector('.error')
    if (errorElement) {
      errorElement.style.display = 'none'
    }
    labelElement.classList.remove('label-error')
  }

  function clearAllErrors () {
    const labels = [
      fullNameLabel,
      usernameLabel,
      mailLabel,
      passwordLabel,
      repeatPasswordLabel,
      checkboxLabel
    ]
    labels.forEach(label => {
      if (label) hideError(label)
    })
  }

  // Функции валидации
  function validateFullName () {
    if (!fullNameInput || !fullNameLabel || !errorFullName) return true

    const value = fullNameInput.value.trim()
    if (!value) {
      showError(fullNameLabel, errorFullName)
      errorFullName.textContent = 'Заполните поле Full Name'
      return false
    }
    if (!regexFullName.test(value)) {
      showError(fullNameLabel, errorFullName)
      errorFullName.textContent =
        'Full Name может содержать только буквы и пробел'
      return false
    }
    return true
  }

  function validateUsername () {
    if (!usernameInput || !usernameLabel || !errorUsername) return true

    const value = usernameInput.value.trim()
    if (!value) {
      showError(usernameLabel, errorUsername)
      errorUsername.textContent = 'Заполните поле Your username'
      return false
    }
    if (!regexUsername.test(value)) {
      showError(usernameLabel, errorUsername)
      errorUsername.textContent =
        'Your username может содержать только буквы, цифры, _ и -'
      return false
    }
    return true
  }

  function validateEmail () {
    if (!mailInput || !mailLabel || !errorMail) return true

    const value = mailInput.value.trim()
    if (!value) {
      showError(mailLabel, errorMail)
      errorMail.textContent = 'Заполните поле E-mail'
      return false
    }
    if (!regexEmail.test(value)) {
      showError(mailLabel, errorMail)
      errorMail.textContent = 'Некорректный формат E-mail'
      return false
    }
    return true
  }

  function validatePassword () {
    if (!passwordInput || !passwordLabel || !errorPassword) return true

    const value = passwordInput.value
    if (!value) {
      showError(passwordLabel, errorPassword)
      errorPassword.textContent = 'Заполните поле Password'
      return false
    }
    if (!regexPassword.test(value)) {
      showError(passwordLabel, errorPassword)
      errorPassword.textContent =
        'Пароль должен быть минимум 8 символов, содержать минимум одну заглавную букву, цифру и спецсимвол'
      return false
    }
    return true
  }

  function validateRepeatPassword () {
    if (!repeatPasswordInput || !repeatPasswordLabel || !errorRepeatPassword)
      return true

    const value = repeatPasswordInput.value
    if (!value) {
      showError(repeatPasswordLabel, errorRepeatPassword)
      errorRepeatPassword.textContent = 'Подтвердите пароль'
      return false
    }
    if (passwordInput && value !== passwordInput.value) {
      showError(repeatPasswordLabel, errorRepeatPassword)
      errorRepeatPassword.textContent = 'Пароли не совпадают'
      return false
    }
    return true
  }

  function validateCheckbox () {
    if (!checkboxInput || !checkboxLabel || !errorCheckbox) return true

    if (!checkboxInput.checked) {
      showError(checkboxLabel, errorCheckbox)
      errorCheckbox.textContent = 'Пожалуйста, подтвердите согласие'
      return false
    }
    return true
  }

  function validateRegistrationForm () {
    clearAllErrors()

    const isFullNameValid = validateFullName()
    const isUsernameValid = validateUsername()
    const isEmailValid = validateEmail()
    const isPasswordValid = validatePassword()
    const isRepeatPasswordValid = validateRepeatPassword()
    const isCheckboxValid = validateCheckbox()

    return (
      isFullNameValid &&
      isUsernameValid &&
      isEmailValid &&
      isPasswordValid &&
      isRepeatPasswordValid &&
      isCheckboxValid
    )
  }

  function validateLoginForm () {
    clearAllErrors()

    const isUsernameValid = validateUsername()
    const isPasswordValid = validatePassword()

    return isUsernameValid && isPasswordValid
  }

  // Обработчик отправки формы
  form.addEventListener('submit', function (event) {
    event.preventDefault()

    if (isLoginMode) {
      if (validateLoginForm()) {
        handleLogin()
      }
    } else {
      if (validateRegistrationForm()) {
        handleRegistration()
      }
    }
  })

  function handleRegistration () {
    // Создаём пользователя
    const user = {
      fullName: fullNameInput ? fullNameInput.value.trim() : '',
      username: usernameInput ? usernameInput.value.trim() : '',
      email: mailInput ? mailInput.value.trim() : '',
      password: passwordInput ? passwordInput.value : ''
    }

    // Проверка уникальности
    let clients = JSON.parse(localStorage.getItem('clients')) || []
    const exists = clients.some(
      u => u.email === user.email || u.username === user.username
    )

    if (exists) {
      alert('Пользователь с таким email или username уже зарегистрирован.')
      return
    }

    // Добавление пользователя
    clients.push(user)
    localStorage.setItem('clients', JSON.stringify(clients))

    // Показ модального окна
    showPopup()
  }

  function handleLogin () {
    const username = usernameInput ? usernameInput.value.trim() : ''
    const password = passwordInput ? passwordInput.value : ''

    // Проверка учетных данных
    let clients = JSON.parse(localStorage.getItem('clients')) || []
    const user = clients.find(
      u =>
        (u.username === username || u.email === username) &&
        u.password === password
    )

    if (user) {
      alert(`Добро пожаловать, ${user.fullName || user.username}!`)
      form.reset()
    } else {
      alert('Неверное имя пользователя или пароль.')
    }
  }

  function showPopup () {
    const popup = document.getElementById('popup')
    if (popup) {
      popup.style.display = 'flex'
    }
  }

  function hidePopup () {
    const popup = document.getElementById('popup')
    if (popup) {
      popup.style.display = 'none'
    }
  }

  // Функция для перехода на страницу логина
  function switchToLogin () {
    isLoginMode = true
    formTitle.textContent = 'Log in to the system'
    submitButton.textContent = 'Sign In'

    // Скрываем поля регистрации (элементы с классом remove)
    const elementsToRemove = document.querySelectorAll('.remove')
    elementsToRemove.forEach(element => {
      element.style.display = 'none'
    })

    if (linkAlreadyHaveAccount) {
      linkAlreadyHaveAccount.textContent = 'Registration'
    }

    clearAllErrors()
  }

  function switchToRegistration () {
    isLoginMode = false
    formTitle.textContent = 'Registration'
    submitButton.textContent = 'Sign Up'

    // Показываем все элементы
    const elementsToRemove = document.querySelectorAll('.remove')
    elementsToRemove.forEach(element => {
      element.style.display = ''
    })

    if (linkAlreadyHaveAccount) {
      linkAlreadyHaveAccount.textContent = 'Already have an account?'
    }

    clearAllErrors()
  }

  // Обработчики событий
  if (linkAlreadyHaveAccount) {
    linkAlreadyHaveAccount.addEventListener('click', function (e) {
      e.preventDefault()
      if (isLoginMode) {
        switchToRegistration()
      } else {
        switchToLogin()
      }
    })
  }

  if (popupOkButton) {
    popupOkButton.addEventListener('click', function () {
      hidePopup()
      switchToLogin()
    })
  }
})
