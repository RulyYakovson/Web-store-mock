const express = require('express');
const uuid = require('uuid4');
const router = express.Router();
const {cors} = require('../utils/helper');
const repository = require('../repositories/customers_repository');
const auth = require('./auth_user');
const { decrypt } = require('../encryption/node-rsa');
const timeout = 1000;

router.use(cors);

router.get('/all', auth.authEmployee, async (req, res) => {
    console.log('Received get all customers request');
    await setTimeout(async () => {
        let data = {};
        data.userRole = req.userRole;
        const result = await repository.getAllCustomers();
        console.log(`Fetch customers result: ${result.data}`);
        if (result.success) {
            data.users = result && result.data;
            res.status(200);
        } else {
            console.log('An error occurred while trying to fetch customers');
            res.status(400);
        }
        res.json(data);
    }, timeout);
});

router.delete('/remove/:id', auth.authEmployee, async (req, res) => {
    console.log(`Received remove customer request for ID: ${req.params.id}`);
    let data = {};
    try {
        await repository.removeCustomer(req.params.id);
        data.userRole = req.userRole;
        const result = await repository.getAllCustomers();
        console.log(`Fetch customers result: ${result.data}`);
        if (result.success) {
            data.customers = result && result.data;
            res.status(200);
        } else {
            console.log('An error occurred while trying to fetch customers');
            res.status(400);
        }
    } catch (err) {
        res.status(500);
        console.log(`Failed to delete user with ID: ${req.params.id}`);
    }
    res.json(data);
});

router.post('/add', async (req, res) => {
    try {
        req.body.id = uuid();
        req.body.password = decrypt(req.body.password);
        await repository.addCustomer(req, res);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('ERROR');
    }
});

router.post('/update', auth.authEmployee, async (req, res) => {
    try {
        await repository.updateCustomer(req.body);
        res.status(200).send('OK');
    } catch (err) {
        console.error(err.message);
        res.status(500).send('ERROR');
    }
});

router.post('/new_pass', async (req, res) => {
    try {
        req.body.password = decrypt(req.body.password);
        await repository.setNewPassword(req, res);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('ERROR');
    }
});

router.post('/change_pass', auth.authUser, async (req, res) => {
    try {
        req.body.oldPassword = decrypt(req.body.oldPassword);
        req.body.newPassword = decrypt(req.body.newPassword);
        await repository.updatePassword(req, res);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('ERROR');
    }
});

module.exports = router;
