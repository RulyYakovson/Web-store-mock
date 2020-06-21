const debug = require("debug")("mongo:model-orders");
const Double = require('@mongoosejs/double');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


module.exports = function (db) {
    const ordersSchema = Schema(
        {
            userId: {type: String, required: true},
            shipTo: {type: String, required: true},
            productsMap: {type: String, required: true},
            paymentMethod: {type: String, required: true},
            total: {type: Double, required: true},
            email: String,
            name: String,
            phone: String,
            floor: String,
            // status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Finish'] },
            lastUpdate: Date,
            created: Date
        },
        {versionKey: false}
    );

    ordersSchema.statics.CREATE = async function (order) {
        return this.create({...order});
    };

    ordersSchema.pre('save', function (next) {
        const date = new Date();
        this.lastUpdate = date;
        console.log(this);
        if (!this.created) {
            this.created = date;
        }
        next();
    });

    db.model("orders", ordersSchema);
    debug("orders model created successfully");
};
