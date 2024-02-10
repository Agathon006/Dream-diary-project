'use strict';

const jwt = require('jsonwebtoken');
try {
    const decodedJwt = jwt.verify(localStorage.getItem('token'), localStorage.getItem('secretKey'));
    if (window.location.href !== "http://localhost:8888/Projects/Studying/projects/Dream_diary_project/html/admin.html"
        && decodedJwt.role === 'admin') {
        window.location.href = "./admin.html";
    } else if (window.location.href === "http://localhost:8888/Projects/Studying/projects/Dream_diary_project/html/admin.html"
        && decodedJwt.role === 'user') {
        window.location.href = "./registered_home.html";
    }
}
catch {
    window.location.href = "../index.html";
}
