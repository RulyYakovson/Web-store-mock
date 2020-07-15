const express = require('express');
const passport = require('passport');
const nodemailer = require('nodemailer');
const {authUser} = require('./auth_user');
const {TIME_OUT, REMEMBER_MAX_AGE, TOKEN_EXPIRATION, MAIL_PASS, MAIL_USER, USER_ROLE} = require('../utils/constants');
const {getUserByEmail} = require('../repositories/repository_helper');
const {setEmpToken, editEmployee} = require('../repositories/employee_repository');
const {setToken, editCustomer} = require('../repositories/customers_repository');
const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
    const {user} = req;
    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.firstName = user.firstName;
    req.session.lastName = user.lastName;
    req.session.gender = user.gender;
    req.session.phone = user.phone;
    req.session.role = user.role;
    if (user.role === 'customer') {
        req.session.email = user.address;
    }
    if (req.body.rememberMe) {
        req.session.cookie.maxAge = REMEMBER_MAX_AGE;
    }
    console.info(`Session for User: '${user.username}', Role: '${user.role}' added successfully`);
    const {firstName, lastName, id, gender, phone, role, address} = user;
    res.status(200).json({user: {firstName, lastName, id, gender, phone, role, address}}); // TODO:
});

router.get('/logout', async (req, res) => {
    const user = req.session.username;
    console.log(`Received logout request for user: ${user}`);
    req.session.destroy(() => {
        console.log(`User ${user} logged out`);
        res.status(200).json({success: true})
    });
});

router.get('/user', authUser, (req, res) => {
    console.log('Received get user details request');
    const data = {
        id: req.session.userId,
        username: req.session.username,
        firstName: req.session.firstName,
        lastName: req.session.lastName,
        phone: req.session.phone,
        gender: req.session.gender,
        email: req.session.email,
        role: req.session.role
    }
    res.status(200).json({user: data});
});

router.post('/edit', authUser, async (req, res) => {
    await setTimeout(async () => {
        try {
            console.log('Received edit profile request');
            if (!req.body.id) {
                res.status(400).send('Missing user id');
                return
            }
            let user = null;
            const {role} = req.session;
            if (role === USER_ROLE.ADMIN || role === USER_ROLE.EMPLOYEE) {
                user = await editEmployee(req);
            } else {
                user = await editCustomer(req);
            }
            const {firstName, lastName, id, gender, phone, address, username, email} = user;
            res.status(200).json({user: {firstName, lastName, id, gender, phone, role, address, username, email}});
        } catch (err) {
            console.error(err.message);
            if (err.message.includes('duplicate key error')) {
                res.status(400).send('ERROR');
            } else {
                res.status(500).send('ERROR');
            }
        }
    }, TIME_OUT)
});

router.post('/reset_pass', async (req, res) => {
    const email = req.body.email;
    console.log(`Received reset password request for email: ${email}`);
    try {
        const user = await getUserByEmail(email);
        if (user) {
            const token = generateToken()
            await resetPassword(user, token, res);
            sendEmail(email, user.firstName, token, res);
        } else if (user === null) {
            console.log(`User with email: '${email}' not found`);
            res.status(400).send('User not found');
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('ERROR');
    }
});

const resetPassword = async (user, token, res) => {
    user.token = token;
    user.expiresOn = Date.now() + TOKEN_EXPIRATION;
    try {
        if (user.role === 'customer') {
            await setToken(user);
        } else {
            await setEmpToken(user);
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('ERROR');
    }
};

const sendEmail = (email, name, token, res) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: MAIL_USER,
            pass: MAIL_PASS
        }
    });
    const mailOptions = {
        sender: "doNotReply@blabla", // ??????????
        to: email,
        subject: 'Password reset ✔',
        text: generateEmailText(name, token),
        html: generateEmailHtml(name, token)
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            console.error(err.message);
            res.status(500).send('ERROR');
        } else {
            console.log(info);
            res.status(200).send('OK');
        }
    });
};
const generateToken = () => Math.random().toString(36).substring(2);

const generateEmailHtml = (name, token) =>
    `<h4 style="color: #500050;">Hello ${name},</h4>
        <h4 style="color: #500050;">Your password has been reset.<br>
        The verification code to choose a new password is: <label style="color: brown"> ${token}</label>.<br>
        Note ! This token is for one-time use and it expires in 10 minutes.<br>
        Go back now to the site and choose a new password.</h4>
        <h4 style="color: #500050;">Regards,<br>
        The site team</h4>`;

const generateEmailText = (name, token) =>
    `Hello ${name},\n
    Your password has been reset\n
    The verification code to choose a new password is: ${token}.\n
    Note ! This token is for one-time use and it expires in 10 minutes.\n
    Go back now to the site and choose a new password.\n
    Regards,\n
    The site team`;

module.exports = router;
