const ordersRepository = require('../model')('orders');
const ordersMock = require('../mock_db/ordersMock');

(async () => {
    let i = 12;
    try {
        ordersMock.forEach(async order => {
            let milliseconds = Date.parse(new Date());
            milliseconds = milliseconds + (i * 12 * 60 * 1000)
            i = i + 1;
            const mockDate = new Date(milliseconds)
            await ordersRepository.CREATE({...order, created: mockDate});
        });
    } catch (err) {
        console.error(err.message);
    }
})();