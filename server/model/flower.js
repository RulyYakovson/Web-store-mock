const debug = require("debug")("mongo:model-flower");
const mongoose = require("mongoose");
const Double = require('@mongoosejs/double');
const Schema = mongoose.Schema;

module.exports = function (db) {
    const flowerSchema = Schema(
        {
            name: { type: String, required: true, unique: true },
            price: { type: Double, required: true },
            amount: Number,
            url: String,
            description: String,
            isNewProduct: {type: Boolean, default: false},
            isSale: {type: Boolean, default: false},
            src: {
                data: Buffer,
                contentType: String
            },
            lastUpdate: Date,
            created: Date
        },
        { versionKey: false }
    );

    flowerSchema.statics.CREATE = async function (flower) {
        return this.create(
            {
                name: flower.name,
                price: flower.price,
                src: flower.src,
                amount: flower.amount,
                isNewProduct: flower.isNewProduct,
                isSale: flower.isSale,
                description: flower.description,
                url: flower.url
            }
        );
    };

    flowerSchema.pre('save', function (next) {
        const date = new Date();
        this.lastUpdate = date;
        if (!this.created) {
            this.created = date;
        }
        next();
    });

    db.model("Flower", flowerSchema);
    debug("Flower model created successfully");
};

