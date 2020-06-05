const debug = require("debug")("mongo:model-contactMessages");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;


module.exports = function (db) {
    const contactMessageSchema = Schema(
        {
            email: { type: String, required: true },
            name: String,
            message: String,
            status: { type: String, default: 'Pending', enum: ['Pending', 'In Progress', 'Finish'] },
            lastUpdate: Date,
            created: Date
        },
        { versionKey: false }
    );

    contactMessageSchema.statics.CREATE = async function (message) {
        return this.create(
            {
                name: message.name,
                email: message.email,
                message: message.message,
            }
        );
    };

    contactMessageSchema.pre('save', function (next) {
        const date = new Date();
        this.lastUpdate = date;
        if (!this.created) {
            this.created = date;
        }
        next();
    });

    db.model("contactMessage", contactMessageSchema);
    debug("contactMessages model created successfully");
};

