export default class Controller {
    constructor(view, model) {
        this.view = view;
        this.model = model;
    }

    init() {
        this._initFormListener();
        this._passwordCheckBoxListener();
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
                        this.view.createWrongSpanElement(SubmitButton, "Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.some(user => user.email === formInfo.email && user.password === formInfo.password)) {
                        this.view.addClassRightToNotWrongElements();
                        this.model.createJwt(formInfo);
                        window.location.href = "./registered_home.html";
                    } else {
                        this.view.addClassWrongInput(emailInput);
                        this.view.addClassWrongInput(passwordInput);
                        this.view.createWrongSpanElement(SubmitButton, `Incorrect email or password`);
                    }
                })
                .catch(error => {
                    this.view.createWrongSpanElement(SubmitButton, `Something go wrong... ${error}`);
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
            this.view.createWrongSpanElement(emailInput, "Incorrect email");
            isValidationOkay = false;
        }
        if (!this.model.isPasswordOkay(formInfo.password)) {
            this.view.addClassWrongInput(passwordInput);
            this.view.createWrongSpanElement(passwordInput, "Password must have 6-200 symbols with at least 1 uppercase and 1 lowercase letter");
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