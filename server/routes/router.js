const express = require('express');
const passport = require('passport');
const nodemailer = require('nodemailer');
const {cors} = require('../utils/helper');
const {authUser} = require('./auth_user');
const {getUserByEmail} = require('../repositories/repository_helper');
const {setEmpToken, editEmployee} = require('../repositories/employee_repository');
const {setToken, editCustomer} = require('../repositories/customers_repository');
const router = express.Router();
const expires = 10 * 60 * 1000; // min * sec * millis

router.use(cors);

// router.get('/', async (req, res) => {
//     console.log('Received get index page request');
//     res.status(200);
//     await setTimeout(() => {
//        res.render('index', { userRole: req.session && req.session.role });
//     }, timeout);
// });

router.post('/login', passport.authenticate('local'), (req, res) => {
    const user = req.user;
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
    console.info(`Session for User: '${user.username}', Role: '${user.role}' added successfully`);
    res.status(200).json({user: {name: 'name 1', role: 'Role 1', success: 'true'}}); // TODO:
});

router.get('/logout', async (req, res) => {
    const user = req.session.username;
    console.log(`Received logout request for user: ${user}`);
    req.session.regenerate(() => {
        console.log(`User ${user} logged out`);
        res.redirect('/');
    });
});

router.get('/user', authUser, async (req, res) => {
    console.log('Received get user details request');
    const data = {
        id: req.session.userId,
        username: req.session.username,
        firstName: req.session.firstName,
        lastName: req.session.lastName,
        phone: req.session.phone,
        gender: req.session.gender,
        email: req.session.email
    }
    res.status(200).json({user: data});
});

router.post('/edit', authUser, async (req, res) => {
    try {
        console.log('Received edit profile request');
        if (req.session.role === 'customer') {
            await editCustomer(req);
        } else {
            await editEmployee(req);
        }
        res.status(200).send('OK');
    } catch (err) {
        console.error(err.message);
        if (err.message.includes('duplicate key error')) {
            res.status(400).send('ERROR');
        } else {
            res.status(500).send('ERROR');
        }
    }
});

router.post('/reset_pass', async (req, res) => {
    const email = req.body.email;
    console.log(`Received reset password request for email: ${email}`);
    try {
        const user = await getUserByEmail(email);
        if (user) {
            const token = generateToken()
            resetPassword(user, token, res);
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
    user.expiresOn = Date.now() + expires;
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
            user: 'ruliweiss@gmail.com',
            pass: 'ruliweiss123'
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
