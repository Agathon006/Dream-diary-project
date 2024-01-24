'use strict';

window.addEventListener('DOMContentLoaded', () => {
    const jwt = require('jsonwebtoken');
    console.log(localStorage.getItem('token'), localStorage.getItem('secretKey'));
    if (jwt.verify(localStorage.getItem('token'), localStorage.getItem('secretKey'))) {
        document.querySelector('#header-navigation-end-account').classList.add('disabled');
    }
});