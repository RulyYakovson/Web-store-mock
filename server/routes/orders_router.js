const express = require('express');
const router = express.Router();
const {BraintreeGateway} = require('braintree');
const repository = require('../repositories/order_repository');
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

router.get('/', auth.authEmployee, async (req, res) => {
    console.log('Received get all orders request');
    setTimeout(async () => {
        let data = {};
        const result = await repository.getAllOrders();
        if (result.success) {
            data.orders = result && result.data;
            res.status(200);
        } else {
            console.log('An error occurred while trying to fetch orders');
            res.status(500);
        }
        res.json(data);
    }, timeout);
});

router.post('/', auth.authUser, async (req, res) => {
    setTimeout(async () => {
        try {
            const {user, shipment, payment} = req.body;
            await repository.addOrder(user, shipment, payment);
            return res.status(200).send('OK');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('ERROR');
        }
    }, timeout)
});

module.exports = router;
