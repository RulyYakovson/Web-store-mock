const contactMessageRepository = require('../model')('contactMessage');

module.exports.getAllContactMessages = async () => {
    let success = false;
    let result = null;
    await contactMessageRepository.find({}, (err, contactMessages) => {
        if (!err) {
            success = true;
            result = contactMessages.map(contactMessage => {
                return {
                    id: contactMessage._id,
                    name: contactMessage.name,
                    email: contactMessage.email,
                    message: contactMessage.message,
                    status: contactMessage.status,
                }
            });
        }
    });
    return {success: success, data: result};
};

module.exports.addContactMessage = async contactMessage => {
    const createdProduct = await contactMessageRepository.CREATE(contactMessage);
    console.log(`A new message from: ${createdProduct.email} created successfully`);
};

module.exports.updateContactMessageStatus = async (id, status) => {
    const message = await contactMessageRepository.findOneAndUpdate({_id: id}, {status}, {new: false});

    !!message ? console.log(`Contact message: '${message._id}' status update to ${status}`)
        : console.log(`Error while trying to update message status, ID: ${message._id}`);
};
