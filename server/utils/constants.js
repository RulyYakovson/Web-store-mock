const {MAIL_PASS, CLOUDINARY} = require('../secrets/vars'); // Need to use your mail and cloudinary credentials

module.exports = {
    TIME_OUT: 1000,
    TOKEN_EXPIRATION: 1000 * 60 * 10, // millis * sec * min (10 minutes)
    SESSION_MAX_AGE: 1000 * 60 * 10, // millis * sec * min (10 minutes)
    REMEMBER_MAX_AGE: 1000 * 60 * 60 * 24 * 30, // millis * sec * min * hours * days (30 days)
    DB_URI: 'mongodb://localhost/final-project-db',
    SESSION_SECRET: 'final project secret',
    CORS_ORIGIN: 'http://localhost:3000',
    USER_ROLE : {
        EMPLOYEE: 'Employee',
        ADMIN: 'Admin',
        CUSTOMER: 'customer'
    },
    MESSAGE_STATUS: {
        PENDING: 'Pending',
        IN_PROGRESS: 'In Progress',
        FINISH: 'Finish'
    },
    MAIL_USER: 'ruliweiss@gmail.com',
    MAIL_PASS: MAIL_PASS,
    CLOUDINARY: {
        CLOUD_NAME: CLOUDINARY.CLOUD_NAME,
        API_KEY: CLOUDINARY.API_KEY,
        API_SECRET: CLOUDINARY.API_SECRET
    },
};