export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initTranslation();
        this._initFormListener();
        this._passwordCheckBoxListener();
    }

    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }

    _initFormListener() {
        const form = this.view.getRegistrerFormElement(),
            SubmitButton = this.view.getSubmitInputElement();

        form.addEventListener('submit', (e) => {
            const emailInput = this.view.getEmailInputElement(),
                passwordInput = this.view.getPasswordInputElement();

            e.preventDefault();

            this.view.clearClassWrongAndRightInputFromElements();
            this.view.clearClassWrongSpanFromElements();

            const formData = new FormData(form);
            const formInfo = Object.fromEntries(formData);

            if (!this._isFormValidationOkay()) {
                this.view.addClassRightToNotWrongElements();
                return;
            }

            this.model.getPromiseDbUsers()
                .then(response => {
                    if (!response.ok) {
                        if (localStorage.getItem('language') === 'ru') {
                            this.view.createWrongSpanElement(SubmitButton, "Проблемы с соединением");
                        } else {
                            this.view.createWrongSpanElement(SubmitButton, "Network response was not ok");
                        }
                    }
                    return response.json();
                })
                .then(data => {
                    for (let item of data) {
                        if (item.email === formInfo.email && item.password === formInfo.password) {
                            this.view.addClassRightToNotWrongElements();
                            formInfo.role = item.role;
                            this.model.createJwt(formInfo);
                            if (item.role === 'user') {
                                window.location.href = "./registered_home.html";
                                return;
                            } else if (item.role === 'admin') {
                                window.location.href = "./admin.html";
                                return;
                            }
                        }
                    }
                    this.view.addClassWrongInput(emailInput);
                    this.view.addClassWrongInput(passwordInput);
                    if (localStorage.getItem('language') === 'ru') {
                        this.view.createWrongSpanElement(SubmitButton, `Неверный email или пароль`);
                    } else {
                        this.view.createWrongSpanElement(SubmitButton, `Incorrect email or password`);
                    }
                })
                .catch(error => {
                    if (localStorage.getItem('language') === 'ru') {
                        this.view.createWrongSpanElement(SubmitButton, `Что-то пошло не так... ${error}`);
                    } else {
                        this.view.createWrongSpanElement(SubmitButton, `Something go wrong... ${error}`);
                    }
                });


        });
    }

    _isFormValidationOkay() {
        const form = this.view.getRegistrerFormElement(),
            emailInput = this.view.getEmailInputElement(),
            passwordInput = this.view.getPasswordInputElement();

        const formData = new FormData(form);
        const formInfo = Object.fromEntries(formData);

        let isValidationOkay = true;

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
                this.view.createWrongSpanElement(passwordInput, "Пароль должно состоять из 6-200 символов с хотя бы 1 заглавной и 1 строчной буквами");
            } else {
                this.view.createWrongSpanElement(passwordInput, "Password must have 6-200 symbols with at least 1 uppercase and 1 lowercase letter");
            }
            isValidationOkay = false;
        }

        return isValidationOkay;
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
}