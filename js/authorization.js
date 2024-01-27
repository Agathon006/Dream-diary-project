'use strict';

const jwt = require('jsonwebtoken');
try {
    jwt.verify(localStorage.getItem('token'), localStorage.getItem('secretKey'))
}
catch {
    window.location.href = "../index.html";
}
