const express = require('express');
const router = express.Router();
const {BraintreeGateway} = require('braintree');
const auth = require('./auth_user');
const timeout = 3000;

router.get('/getToken', auth.authUser, async (req, res) => {
    try {
        const {clientToken} = await payments.getToken();
        return res.status(200).json({token: clientToken});
    } catch (error) {
        res.status(500).send(error);
    }
});

router.post('/', auth.authUser, async (req, res) => {
    setTimeout(() => {

    try {
        const {user, payment} = req.body;
        console.log('user:');
        console.log(user);
        console.log('payment:');
        console.log(payment);
        const productsMap = new Map(JSON.parse(payment.productsMap))
        productsMap.forEach( (value, key) => console.log(value + ' ' + key))
        return res.status(200).send('OK');
    } catch (error) {
        res.status(500).send(error);
    }
    }, timeout)
});

module.exports = router;
