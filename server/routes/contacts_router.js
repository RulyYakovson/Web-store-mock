const express = require('express');
const router = express.Router();
const repository = require('../repositories/contact_messsages_repository');
const auth = require('./auth_user');
const {MESSAGE_STATUS} = require('../utils/constants');
const {TIME_OUT} = require('../utils/constants');

router.get('/all', auth.authEmployee, async (req, res) => {
    console.log('Received get all contact messages request');
    await setTimeout(async () => {
        let data = {};
        const result = await repository.getAllContactMessages();
        if (result.success) {
            data.messages = result && result.data;
            res.status(200);
        } else {
            console.log('An error occurred while trying to fetch contact messages');
            res.status(500);
        }
        res.json(data);
    }, TIME_OUT);
});

router.post('/add', async (req, res) => {
    const {body} = req
    console.info(`Received add contact message request\n${Object.values(body)}`);
    setTimeout(async () => {
        try {
            await repository.addContactMessage(body);
            res.status(200).send('OK');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('ERROR');
        }
    }, TIME_OUT)
});

router.post('/update/status', auth.authEmployee, async (req, res) => {
    const {id, status} = req.body;
    if (!id) {
        console.error('Message id is missing')
        res.status(400).send('Message id is missing');
        return;
    }
    // TODO:
    // if (!MESSAGE_STATUS.includes(status)) {
    //     console.info('ccccccccccc')
    //     res.status(400).send('Invalid status to update');
    //     return;
    // }

    console.info(`Received update status request for message: ${id}`)
    setTimeout(async () => {
        try {
            await repository.updateContactMessageStatus(id, status);
            res.status(200).send('OK');
        } catch (err) {
            console.error(err.message);
            res.status(500).send('ERROR');
        }
    }, TIME_OUT);
});

module.exports = router;
