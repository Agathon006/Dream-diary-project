export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initTranslation();
        this._initBurgerButtonListener();
        this._googleSignInListener();
        this._passwordCheckBoxListener();
        this._initFormListener();
    }

    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }

    _initBurgerButtonListener() {
        document.querySelector('.body').addEventListener('click', (event) => {
            if (event.target.id === 'burger-button' || event.target.parentNode.id === 'burger-button') {
                document.querySelector('#burger-content').classList.remove('not-exist');
            }
            else if (!event.target.closest('.burger-content-wrapper')) {
                document.querySelector('#burger-content').classList.add('not-exist');
            }
        });
    }

    _googleSignInListener() {
        window.handleCredentialResponse = (response) => {
            // Under development (needed node js)

            // // decodeJwtResponse() is a custom function defined by you
            // // to decode the credential response.
            // responsePayload = decodeJwtResponse(response.credential);

            // console.log("ID: " + responsePayload.sub);
            // console.log('Full Name: ' + responsePayload.name);
            // console.log('Given Name: ' + responsePayload.given_name);
            // console.log('Family Name: ' + responsePayload.family_name);
            // console.log("Image URL: " + responsePayload.picture);
            // console.log("Email: " + responsePayload.email);

            if (localStorage.getItem('language') === 'ru') {
                alert('Вход с помощью сервисов находится в стадии разработки, вместо этого вам следует зарегистрироваться обычным способом.');
            } else {
                alert('Sign in by services is under development, you need to register by basic way instead.');
            }
        }
    }

    _passwordCheckBoxListener() {
        const passwordCheckBox = this.view.getPassworCheckBoxInputElement();
        passwordCheckBox.addEventListener('change', () => {
            var passwordInput = this.view.getPasswordInputElement();
            if (passwordCheckBox.checked) {
                passwordInput.type = 'text';
            } else {
                passwordInput.type = 'password';
            }
        });
    }

    _initFormListener() {
        const form = this.view.getRegistrerFormElement(),
            submitButton = this.view.getSubmitInputElement();

        form.addEventListener('submit', (e) => {

            e.preventDefault();

            this.view.clearClassWrongAndRightInputFromElements();
            this.view.clearClassWrongSpanFromElements();

            const formData = new FormData(form);
            const formInfo = Object.fromEntries(formData);
            delete formInfo.showPassword;
            formInfo.role = 'user';
            formInfo.name = '';
            formInfo.surname = '';
            formInfo.birthDate = '';
            formInfo.profileInfo = '';
            formInfo.avatar = '';

            if (!this._isFormValidationOkay()) {
                this.view.addClassRightToNotWrongElements();
                return;
            }

            const isNicknameInDb = this._getPromiseIsNicknameExist();

            const isEmailInDb = this._getPromiseIsEmailExist();

            Promise.all([isNicknameInDb, isEmailInDb])
                .then(data => {
                    this.view.addClassRightToNotWrongElements();
                    if (!(data[0] || data[1])) {
                        this._initCodeFormListener(formInfo, submitButton);
                    }
                })
                .catch(error => {
                    if (localStorage.getItem('language') === 'ru') {
                        this.view.createWrongSpanElement(submitButton, `Что-то пошло не так... ${error}`);
                    } else {
                        this.view.createWrongSpanElement(submitButton, `Something go wrong... ${error}`);
                    }
                });
        });
    }

    _isFormValidationOkay() {
        const form = this.view.getRegistrerFormElement(),
            nicknameInput = this.view.getNicknameInputElement(),
            emailInput = this.view.getEmailInputElement(),
            passwordInput = this.view.getPasswordInputElement();

        const formData = new FormData(form);
        const formInfo = Object.fromEntries(formData);

        let isValidationOkay = true;

        if (!this.model.isNicknameOkay(formInfo.nickname)) {
            this.view.addClassWrongInput(nicknameInput);
            if (localStorage.getItem('language') === 'ru') {
                this.view.createWrongSpanElement(nicknameInput, "Никнейм должен состоять из 5-15 цифр/букв и не может начинаться с цифры");
            } else {
                this.view.createWrongSpanElement(nicknameInput, "Nickname must consist of 5-15 numbers/letters and can't start with a number");
            }
            isValidationOkay = false;
        }
        if (!this.model.isEmailOkay(formInfo.email)) {
            this.view.addClassWrongInput(emailInput);
            if (localStorage.getItem('language') === 'ru') {
                this.view.createWrongSpanElement(emailInput, "Некорректный email");
            } else {
                this.view.createWrongSpanElement(emailInput, "Incorrect email");
            }
            isValidationOkay = false;
        }
        if (!this.model.isPasswordOkay(formInfo.password)) {
            this.view.addClassWrongInput(passwordInput);
            if (localStorage.getItem('language') === 'ru') {
                this.view.createWrongSpanElement(passwordInput, "Пароль должен состоять из 6-200 символов с хотя бы 1 заглавной и 1 строчной буквами");
            } else {
                this.view.createWrongSpanElement(passwordInput, "Password must have 6-200 symbols with at least 1 uppercase and 1 lowercase letter");
            }
            isValidationOkay = false;
        }

        return isValidationOkay;
    }

    _getPromiseIsNicknameExist() {
        const form = this.view.getRegistrerFormElement(),
            nicknameInput = this.view.getNicknameInputElement();
        const formData = new FormData(form);
        const formInfo = Object.fromEntries(formData);

        return this.model.isNicknameInDb(formInfo.nickname)
            .then(response => {
                if (!response.ok) {
                    if (localStorage.getItem('language') === 'ru') {
                        this.view.createWrongSpanElement(nicknameInput, "Проблемы с соединением");
                    } else {
                        this.view.createWrongSpanElement(nicknameInput, "Network response was not ok");
                    }
                }
                return response.json();
            })
            .then(data => {
                if (data.length) {
                    this.view.addClassWrongInput(nicknameInput);
                    if (localStorage.getItem('language') === 'ru') {
                        this.view.createWrongSpanElement(nicknameInput, "Этот никнейм уже используется");
                    } else {
                        this.view.createWrongSpanElement(nicknameInput, "That nickname is already used");
                    }
                    return true;
                }
                return false;
            })
    }

    _getPromiseIsEmailExist() {
        const form = this.view.getRegistrerFormElement(),
            emailInput = this.view.getEmailInputElement();

        const formData = new FormData(form);
        const formInfo = Object.fromEntries(formData);

        return this.model.isEmailInDb(formInfo.email)
            .then(response => {
                if (!response.ok) {
                    if (localStorage.getItem('language') === 'ru') {
                        this.view.createWrongSpanElement(emailInput, "Проблемы с соединением");
                    } else {
                        this.view.createWrongSpanElement(emailInput, "Network response was not ok");
                    }
                }
                return response.json();
            })
            .then(data => {
                if (data.length) {
                    this.view.addClassWrongInput(emailInput);
                    if (localStorage.getItem('language') === 'ru') {
                        this.view.createWrongSpanElement(emailInput, "Этот email уже используется");
                    } else {
                        this.view.createWrongSpanElement(emailInput, "That email is already used");
                    }
                    return true;
                }
                return false;
            })
    }

    _initCodeFormListener(formInfo, submitButton) {
        const form = this.view.getCodeFormElement(),
            numberInputs = this.view.getCodeFormNumberInputs(),
            devMessage = this.view.getDevMessageElement(),
            devMessageCode = this.view.getDevMessageCodeElement(),
            verificationCode = this.model.generateRandomCode(6);

        this.view.removeClassHidden(form);

        form.addEventListener('mouseover', () => {
            this.view.removeClassHidden(devMessage);
        })

        devMessageCode.innerText = verificationCode;

        numberInputs.forEach((input, index) => {
            input.addEventListener('input', () => {

                this.model.passIfNumber(input);

                if (input.value.length === 1) {
                    if (index < numberInputs.length - 1) {
                        numberInputs[index + 1].focus();
                    } else {
                        if (this._isVerificationCodeCorrect(numberInputs, verificationCode, form)) {

                            this.model.registerNewUser(JSON.stringify(formInfo))
                                .then((response) => {
                                    if (!response.ok) {
                                        if (localStorage.getItem('language') === 'ru') {
                                            this.view.createWrongSpanElement(submitButton, "Проблемы с соединением");
                                        } else {
                                            this.view.createWrongSpanElement(submitButton, "Network response was not ok");
                                        }
                                    }
                                    return true;
                                })
                                .then((response) => {
                                    this.model.createJwt(formInfo);
                                    window.location.href = "./registered_home.html";
                                })
                                .catch((error) => {
                                    if (localStorage.getItem('language') === 'ru') {
                                        this.view.createWrongSpanElement(submitButton, `Что-то пошло не так... ${error}`);
                                    } else {
                                        this.view.createWrongSpanElement(submitButton, `Something go wrong... ${error}`);
                                    }
                                });
                        };
                    }
                }
            });
        });
    }

    _isVerificationCodeCorrect(numberInputs, verificationCode, form) {
        numberInputs.forEach((input, index) => {
            this.view.removeClassWrongInput(form);
            if (input.value !== verificationCode[index]) {
                this.view.addClassWrongInput(form);
                return;
            }
            this.view.removeClassRightInput(form);
        });
        if (form.classList.contains('wrong-input')) {
            return false;
        } else {
            this.view.addClassRightInput(form);
            return true;
        }
    }
}