document.addEventListener('DOMContentLoaded', function () {
  // Input элементы
  const fullNameInput = document.querySelector('#full-name input')
  const usernameInput = document.querySelector('#username input')
  const mailInput = document.querySelector('#mail input')
  const passwordInput = document.querySelector('#password input')
  const repeatPasswordInput = document.querySelector('#repeat-password input')
  const checkboxInput = document.getElementById('checkbox-input')
  const form = document.getElementById('order')

  // Label элементы
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
    /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>/?]).{8,}$/

  // Состояние формы
  let isLoginMode = false

  // Инициализация
  initializeEventListeners()

  function initializeEventListeners () {
    if (fullNameInput) {
      fullNameInput.addEventListener('keypress', function (event) {
        if (event.key >= '0' && event.key <= '9') {
          event.preventDefault()
        }
      })
    }

    // Обработчики ввода для скрытия ошибок
    const inputs = [
      { input: fullNameInput, label: fullNameLabel },
      { input: usernameInput, label: usernameLabel },
      { input: mailInput, label: mailLabel },
      { input: passwordInput, label: passwordLabel },
      { input: repeatPasswordInput, label: repeatPasswordLabel }
    ]

    inputs.forEach(({ input, label }) => {
      if (input) {
        input.addEventListener('input', function () {
          hideError(label)
        })
      }
    })

    if (checkboxInput) {
      checkboxInput.addEventListener('change', function () {
        hideError(checkboxLabel)
      })
    }
  }

  // Вспомогательные функции для ошибок
  function showError (labelElement, errorElement, errorText) {
    if (!labelElement || !errorElement) return

    errorElement.textContent = errorText
    errorElement.style.display = 'block'
    labelElement.classList.add('label-error')
  }

  function hideError (labelElement) {
    if (!labelElement) return

    labelElement.classList.remove('label-error')

    let errorElement
    switch (labelElement.id) {
      case 'full-name':
        errorElement = errorFullName
        break
      case 'username':
        errorElement = errorUsername
        break
      case 'mail':
        errorElement = errorMail
        break
      case 'password':
        errorElement = errorPassword
        break
      case 'repeat-password':
        errorElement = errorRepeatPassword
        break
      case 'checkbox-label':
        errorElement = errorCheckbox
        break
      default:
        return
    }

    if (errorElement) {
      errorElement.textContent = ''
      errorElement.style.display = 'none'
    }
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

  // Валидация отдельных полей
  
  function validateFullName () {
    const value = fullNameInput.value.trim()
    if (!value) {
      showError(fullNameLabel, errorFullName, 'Заполните поле Full Name')
      return false
    }
    if (!regexFullName.test(value)) {
      showError(
        fullNameLabel,
        errorFullName,
        'Full Name может содержать только буквы и пробел'
      )
      return false
    }
    return true
  }

  fullNameInput.addEventListener('input', () => {
    if (validateFullName()) {
      fullNameLabel.classList.add('valid')
    } else {
      fullNameLabel.classList.remove('valid')
    }
  })

  function validateUsername () {
    const value = usernameInput.value.trim()
    if (!value) {
      showError(usernameLabel, errorUsername, 'Заполните поле Your username')
      return false
    }
    if (!regexUsername.test(value)) {
      showError(
        usernameLabel,
        errorUsername,
        'Username может содержать только буквы, цифры, подчеркивание и тире'
      )
      return false
    }
    return true
  }

  usernameInput.addEventListener('input', () => {
    if (validateUsername()) {
      usernameLabel.classList.add('valid')
    } else {
      usernameLabel.classList.remove('valid')
    }
  })

  function validateEmail () {
    console.log('validateEmail вызван')
    const value = mailInput.value.trim()
    console.log('Value:', value)
    if (!value) {
      showError(mailLabel, errorMail, 'Заполните поле E-mail')
      return false
    }
    if (!regexEmail.test(value)) {
      showError(mailLabel, errorMail, 'Введите корректный E-mail')
      return false
    }
    console.log('Email валиден')
    return true
  }

    mailInput.addEventListener('input', () => {
    if (validateEmail()) {
      mailInput.classList.add('valid')
      console.log(mailInput.className);
    } else {
      mailInput.classList.remove('valid')
    }
  })

  function validatePassword () {
    const value = passwordInput.value
    if (!value) {
      showError(passwordLabel, errorPassword, 'Заполните поле Password')
      return false
    }
    if (value.length < 8) {
      showError(
        passwordLabel,
        errorPassword,
        'Пароль должен содержать минимум 8 символов'
      )
      return false
    }
    if (!regexPassword.test(value)) {
      showError(
        passwordLabel,
        errorPassword,
        'Пароль должен содержать: заглавную букву, цифру и спецсимвол'
      )
      return false
    }
    return true
  }

  passwordInput.addEventListener('input', () => {
    if (validatePassword()) {
      passwordInput.classList.add('valid')
    } else {
      passwordInput.classList.remove('valid')
    }
  })

  function validateRepeatPassword () {
    const passwordValue = passwordInput.value
    const repeatValue = repeatPasswordInput.value

    if (!repeatValue) {
      showError(repeatPasswordLabel, errorRepeatPassword, 'Повторите пароль')
      return false
    }
    if (passwordValue !== repeatValue) {
      showError(repeatPasswordLabel, errorRepeatPassword, 'Пароли не совпадают')
      return false
    }
    return true
  }

  repeatPasswordInput.addEventListener('input', () => {
    if (validateRepeatPassword()) {
      repeatPasswordInput.classList.add('valid')
    } else {
      repeatPasswordInput.classList.remove('valid')
    }
  })

  function validateCheckbox () {
    if (!checkboxInput.checked) {
      showError(
        checkboxLabel,
        errorCheckbox,
        'Вы должны согласиться с условиями'
      )
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

    const username = usernameInput.value.trim()
    const password = passwordInput.value
    let isValid = true

    // Проверка заполнения полей
    if (!username) {
      showError(usernameLabel, errorUsername, 'Заполните поле Your username')
      isValid = false
    }

    if (!password) {
      showError(passwordLabel, errorPassword, 'Заполните поле Password')
      isValid = false
    }

    if (!isValid) return false

    // Проверка пользователя в Local Storage
    const clients = JSON.parse(localStorage.getItem('clients')) || []
    const user = clients.find(
      u => u.username === username || u.email === username
    )

    if (!user) {
      showError(
        usernameLabel,
        errorUsername,
        'Такой пользователь не зарегистрирован'
      )
      return false
    }

    if (user.password !== password) {
      showError(passwordLabel, errorPassword, 'Неверный пароль')
      return false
    }

    return true
  }

  // Обработчик отправки формы
  if (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault()

      let isValid = false

      if (isLoginMode) {
        isValid = validateLoginForm()
        if (isValid) {
          handleLogin()
        }
      } else {
        isValid = validateRegistrationForm()
        if (isValid) {
          handleRegistration()
        }
      }
    })
  }

  function handleRegistration () {
    // Создаём пользователя
    const user = {
      fullName: fullNameInput.value.trim(),
      username: usernameInput.value.trim(),
      email: mailInput.value.trim(),
      password: passwordInput.value
    }

    // Проверка уникальности
    let clients = JSON.parse(localStorage.getItem('clients')) || []
    const emailExists = clients.some(u => u.email === user.email)
    const usernameExists = clients.some(u => u.username === user.username)

    if (emailExists) {
      showError(
        mailLabel,
        errorMail,
        'Пользователь с таким email уже зарегистрирован'
      )
      return
    }

    if (usernameExists) {
      showError(
        usernameLabel,
        errorUsername,
        'Пользователь с таким username уже зарегистрирован'
      )
      return
    }

    // Добавление пользователя
    clients.push(user)
    localStorage.setItem('clients', JSON.stringify(clients))

    showPopup()

    form.reset()
  }

  function handleLogin () {
    const username = usernameInput.value.trim()
    const clients = JSON.parse(localStorage.getItem('clients')) || []
    const user = clients.find(
      u => u.username === username || u.email === username
    )
    if (user) {
      // Получаем полное имя (fullName)
      const fullName = user.fullName || user.username

      // Заменяем заголовок
      if (formTitle) {
        formTitle.textContent = `Welcome, ${fullName}!`
      }

      // Заменяем кнопку
      if (submitButton) {
        submitButton.textContent = 'Exit'

        const newButton = submitButton.cloneNode(true)
        submitButton.replaceWith(newButton)

        newButton.addEventListener('click', () => {
          location.reload()
        })
      }

      const elementsToHide = document.querySelectorAll('.order-form-label')
      elementsToHide.forEach(el => {
        el.classList.add('hide-on-login')
      })
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

  function switchToLogin () {
    isLoginMode = true
    formTitle.textContent = 'Log in to the system'
    submitButton.textContent = 'Sign In'

    // Скрываем поля регистрации
    const elementsToRemove = document.querySelectorAll('.remove')
    elementsToRemove.forEach(element => {
      element.style.display = 'none'
    })

    if (linkAlreadyHaveAccount) {
      linkAlreadyHaveAccount.textContent = 'Registration'
      linkAlreadyHaveAccount.href = '#'
    }

    clearAllErrors()
    form.reset()
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
      linkAlreadyHaveAccount.href = '#'
    }

    clearAllErrors()
    form.reset()
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

  clearAllErrors()
})
