const debug = require("debug")("mongo:model");
const mongo = require('mongoose');
const { DB_URI } = require('../utils/constants');
const customer = require('./customer');
const employee = require('./employee');
const branch = require('./branch');
const flower = require('./flower');

const db = mongo.createConnection();
const uri = DB_URI;
const connectionOptions = { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true };

(async () => {
    try {
        await db.openUri(uri, connectionOptions);
    } catch (err) {
        debug(`Error while trying connecting to mongo DB: ${err}`);
    }
})();

debug('Pending to DB connection');

customer(db);
employee(db);
branch(db);
flower(db);

module.exports = model => db.model(model);