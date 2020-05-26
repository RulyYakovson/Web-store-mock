const cors = require('cors');
const { CORS_ORIGIN } = require('../utils/constants');

module.exports.updateSession = (user, session) => {
    session.userId = user.id;
    session.username = user.username;
    session.firstName = user.firstName;
    session.lastName = user.lastName;
    session.gender = user.gender;
    session.phone = user.phone;
    session.role = user.role;
    if (user.role === 'customer') {
        session.email = user.address;
    } else {
        session.email = user.email;
    }
};

module.exports.cors = cors({
    credentials: true,
    origin: CORS_ORIGIN
})