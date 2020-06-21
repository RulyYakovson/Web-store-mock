const express = require('express');
const router = express.Router();
const multer = require('multer');
const repository = require('../repositories/flower_repository');
const auth = require('./auth_user');
const timeout = 1000;

const storage = multer.memoryStorage();
const uploadImgHandler = multer({storage: storage}).single('image');
const MAX_RETRIES = 5;

router.get('/all', auth.authUser, async (req, res) => {
    console.log('Received get flowers request');
    await setTimeout(async () => {
        let data = {};
        data.userRole = req.userRole;
        for (let i = 0; i <= MAX_RETRIES; ++i) {
            let result = await repository.getAllFlowers();
            if (result.success) {
                console.log(`Fetch ${result.data.length} flowers`);
                data.flowers = result && result.data;
                res.status(200);
                break;
            } else if (i < MAX_RETRIES) {
                console.log('An error occurred while trying to fetch flowers - WILL TRY AGAIN !!');
            } else {
                console.log('An error occurred while trying to fetch flowers');
                res.status(500);
            }
        }
        res.json(data);
    }, timeout);
});

router.delete('/remove/:name', auth.authEmployee, async (req, res) => {
    console.log(`Received remove flower request for: ${req.params.name}`);
    let data = {};
    try {
        await repository.removeFlower(req.params.name);
        data.userRole = req.userRole;
        const result = await repository.getAllFlowers();
        console.log(`Fetch ${result.data && result.data.length} flowers`);
        if (result.success) {
            data.flowers = result && result.data;
            res.status(200);
        } else {
            console.log('An error occurred while trying to fetch flowers');
            res.status(500);
        }
    } catch (err) {
        res.status(500);
        console.log(`Failed to delete flower: ${req.params.name}`);
    }
    res.json(data);
});

router.post('/add', auth.authEmployee, async (req, res) => {
    const {name, description, price, amount, isNewProduct, isSale} = req.body;
    console.info(`Received add flower request, Name: ${name},
    Description: ${description}, Price: ${price}, Amount: ${amount}.`);

    try {
        await repository.addFlower({name, description, price, amount, isNewProduct, isSale});
        res.status(200).send('OK');
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

router.post('/update', auth.authEmployee, async (req, res) => {
    const {name, description, price, amount, id, isNewProduct, isSale} = req.body;
    console.info(`Received update flower request, Name: ${name},
    Description: ${description}, Price: ${price}, Amount: ${amount}.`);

    try {
        await repository.updateFlower({id, name, description, price, amount, isNewProduct, isSale});
        res.status(200).send('OK');
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

router.post('/update/image', auth.authEmployee, uploadImgHandler, async (req, res) => {
    try {
        const {file, body} = req;
        const {id} = body;
        if (!file) {
            res.status(400).send('Missing image to update');
        }
        const {buffer, mimetype} = file;
        const encodeFile = buffer.toString('base64');
        const src = {
            contentType: mimetype,
            data: new Buffer.from(encodeFile, 'base64')
        };

        await repository.updateFlower({src, id});
        res.status(200).send('OK');
    } catch (err) {
        console.error(err.message);
        res.status(500).send(err.message);
    }
});

module.exports = router;
