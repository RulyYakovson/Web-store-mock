module.exports = {
    MAIL_PASS: '',
    TIME_OUT: 1000,
    TOKEN_EXPIRATION: 1000 * 60 * 10, // millis * sec * min (10 minutes)
    SESSION_MAX_AGE: 1000 * 60 * 10, // millis * sec * min (10 minutes)
    REMEMBER_MAX_AGE: 1000 * 60 * 60 * 24 * 30, // millis * sec * min * hours * days (30 days)
    DB_URI: 'mongodb://localhost/final-project-db',
    SESSION_SECRET: 'final project secret',
    CORS_ORIGIN: 'http://localhost:3000',
    MESSAGE_STATUS: {
        PENDING: 'Pending',
        IN_PROGRESS: 'In Progress',
        FINISH: 'Finish'
    }
};