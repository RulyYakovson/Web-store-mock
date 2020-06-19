const ordersRepository = require('../model')('orders');

module.exports.getAllOrders = async () => {
    let success = false;
    let result = null;
    await ordersRepository.find({}, (err, orders) => {
        err && console.error(err);
        if (!err) {
            result = orders;
            success = true;
        }
    });
    return { success: success, data: result };
};

module.exports.addOrder = async (user, shipment, payment) => {
    const {firstName, lastName, phone, street, city, floor} = shipment;
    const {id, email} = user;
    const shipmentDetails = {shipTo: `${street}, ${city}`, name: `${firstName} ${lastName}`}
    const order = {userId: id, email, phone, floor, ...shipmentDetails, ...payment};
    const createdOrder = await ordersRepository.CREATE(order);
    console.log(`A new order created successfully. To: ${createdOrder.shipTo}, Total: ${createdOrder.total}`);
};
