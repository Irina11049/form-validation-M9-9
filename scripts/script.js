//1
window.onload = function () {
    let form = document.querySelector('.order');
    let fullNameInput = document.getElementById('full-name');
    let usernameInput = document.getElementById('username');
    let checkboxInput = document.getElementById('checkbox-input');
    let mailInput = document.getElementById('mail');
    let passwordInput = document.getElementById('password');
    let repeatPasswordInput = document.getElementById('repeat-password');
    let fullNameLabel = form.querySelector('label[for="full-name"]');
    let mailLabel = form.querySelector('label[for="mail"]');
    let repeatPasswordLabel = form.querySelector('label[for="repeat-password"]');
    let checkbox = document.getElementById('checkbox');

    let formTitle = form.querySelector('.order-title');
    let submitButton = document.getElementById('button');
    let alreadyHaveAccountLink = form.querySelector('.order-active-text');
    let popupOkButton = document.getElementById('popup-ok');

    let linkAlreadyHaveAccount = document.querySelector('.order-active-text');

    //2
    fullNameInput.addEventListener('keypress', function (event) {
        if (event.key >= '0' && event.key <= '9') {
            event.preventDefault();
        }
    });

    //3
    usernameInput.addEventListener('keypress', function (event) {
        if (event.key === '.' || event.key === ',') {
            event.preventDefault();
        };
    });

    //4
    checkboxInput.addEventListener('change', function () {
        if (this.checked) {
            console.log('Согласен');
        } else {
            console.log('Не согласен');
        }
    });


    //5
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        let fields = [
            { id: 'full-name', name: 'Full Name' },
            { id: 'username', name: 'Your username' },
            { id: 'mail', name: 'E-mail' },
            { id: 'password', name: 'Password' },
            { id: 'repeat-password', name: 'Repeat Password' }
        ];

        // Проверка заполненности текстовых полей
        for (let field of fields) {
            const input = document.getElementById(field.id);
            if (!input.value.trim()) {
                alert(`Пожалуйста, заполните поле "${field.name}".`);
                input.focus();
                return;
            }

            //Проверка длины пароля
            if (field.id === 'password' && input.value.trim().length < 8) {
                alert('Пароль должен содержать не менее 8 символов.');
                return;
            }
        }

        //Проверка совпадения паролей
        let password = passwordInput.value.trim();
        let repeatPassword = repeatPasswordInput.value.trim();
        if (password !== repeatPassword) {
            alert('Пароли не совпадают.');
            document.getElementById('repeat-password').focus();
            return;
        }

        // Проверка чекбокса

        if (!checkboxInput.checked) {
            alert('Пожалуйста, подтвердите согласие с условиями.');
            checkboxInput.focus();
            return;
        }

        showPopup();
    });

    function showPopup() {
        let popup = document.getElementById('popup');
        popup.style.display = 'flex';

        // Обработчик кнопки ОК
        document.getElementById('popup-ok').onclick = function () {
            popup.style.display = 'none';
            form.reset();  
        };
    }

    //6
    // Функция для перехода на страницу логина
    function switchToLogin() {
        // Заменяем заголовок
        formTitle.textContent = 'Log in to the system';

        // Удаляем лишние поля и чекбокс
        if (fullNameLabel) {
            fullNameLabel.remove();
            fullNameInput.remove();
        }
        if (mailLabel) {
            mailLabel.remove();
            mailInput.remove();
        }
        if (repeatPasswordLabel) {
            repeatPasswordLabel.remove();
            repeatPasswordInput.remove();
        }
        if (checkbox) {
            checkbox.remove();
        }

        // Заменяем текст в кнопке на «Sign In»
        submitButton.textContent = 'Sign In';

        // Удаляем ссылку "Already have an account?"
        if (alreadyHaveAccountLink) {
            alreadyHaveAccountLink.remove();
        }

        // Переназначаем обработчик для кнопки
        submitButton.onclick = function (e) {
            e.preventDefault();

            let usernameValue = document.getElementById('username').value.trim();
            let passwordValue = document.getElementById('password').value.trim();

            if (!usernameValue) {
                alert('Пожалуйста, введите имя пользователя.');
                document.getElementById('username').focus();
                return;
            }
            if (!passwordValue) {
                alert('Пожалуйста, введите пароль.');
                document.getElementById('password').focus();
                return;
            }

            alert(`Добро пожаловать, ${usernameValue}!`);
        };
    }

    // Обработчик для ссылки "Already have an account?"
    if (linkAlreadyHaveAccount) {
        linkAlreadyHaveAccount.addEventListener('click', function (e) {
            e.preventDefault();
            switchToLogin();
        });
    }

    // Обработчик для кнопки «ОК» в попапе
    if (popupOkButton) {
        popupOkButton.addEventListener('click', function () {
            let popup = document.getElementById('popup');
            if (popup) {
                popup.style.display = 'none';
            }
            switchToLogin();
        });
    }

}
