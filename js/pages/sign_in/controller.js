/**
 * sign_in page controller module.
 * @module js/pages/sign_in/controller
 */

export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initTranslation();
        this._initBurgerButtonListener();
        this._initFormListener();
        this._passwordCheckBoxListener();
    }

    /**
     * Initializes translation based on the stored language preference.
     * If the stored language is Russian ('ru'), it translates the page using the view's translatePage method.
     */
    _initTranslation() {
        if (localStorage.getItem('language') === 'ru') {
            this.view.translatePage();
        }
    }

    /**
     * Initializes a click event listener for the burger button to control the burger content visibility.
     * Toggles the visibility of the burger content based on the target click and the element's classes.
     */
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

    /**
    Initializes a form listener that listens for submit event on the sign in form
    */
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

    /**
    Checks if form validation is okay.
    @returns {boolean} Returns true if form validation is okay, false otherwise. */
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
                this.view.createWrongSpanElement(passwordInput, "Пароль должен состоять из 6-200 символов с хотя бы 1 заглавной и 1 строчной буквами");
            } else {
                this.view.createWrongSpanElement(passwordInput, "Password must have 6-200 symbols with at least 1 uppercase and 1 lowercase letter");
            }
            isValidationOkay = false;
        }

        return isValidationOkay;
    }

    /**
    Listen for changes on the password check box and toggle the password input type accordingly.
    */
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