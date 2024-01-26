export default class Model {

    isNicknameOkay(nicknameInput) {
        return nicknameInput.match(/^[a-zA-Z][a-zA-Z0-9_]{4,14}$/);
    }

    isEmailOkay(emailInput) {
        return emailInput.match(/^[\w-.]+@gmail.com$/);
    }

    isPasswordOkay(passwordInput) {
        return passwordInput.match(/^(?=.*[a-z])(?=.*[A-Z]).{6,200}$/);
    }

    isNicknameInDb(nickname) {
        return fetch(`http://localhost:3000/users?nickname=${nickname}`)
    }

    isEmailInDb(email) {
        return fetch(`http://localhost:3000/users?email=${email}`)
    }

    sendConfirmationCode(email, verificationCode) {
        const nodemailer = require('nodemailer');

        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'dreamDiaryProjectAgathon006@gmail.com',
                pass: '0275674Dd'
            }
        });

        let mailOptions = {
            from: 'dreamDiaryProjectAgathon006@gmail.com',
            to: email,
            subject: 'Подтверждение электронной почты',
            text: `Ваш код подтверждения: ${verificationCode}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email отправлен: ' + info.response);
            }
        });
    }

    generateRandomCode(length) {
        let result = '';
        const characters = '0123456789';
        const charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    registerNewUser(data) {
        return fetch('http://localhost:3000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
    }

    createJwt(userData) {
        const jwt = require('jsonwebtoken');
        const payload = userData;
        const secretKey = '8dshsdf8s3hfsdh8fshf8dhfs3hhfhfsh38fh';
        const token = jwt.sign(payload, secretKey, { expiresIn: '24h' });

        localStorage.token = token;
        localStorage.secretKey = secretKey;
    }

}