const flowerRepository = require('../model')('Flower');

module.exports.getAllFlowers = async () => {
    let success = false;
    let result = null;
    await flowerRepository.find({}, (err, flowers) => {
        if (!err) {
            success = true;
            result = flowers.map(flower => {
                return {
                    id: flower._id,
                    name: flower.name,
                    price: flower.price,
                    description: flower.description,
                    amount: flower.amount,
                    isNew: flower.isNew,
                    src: flower.src.data && flower.src.data.toString('base64')
                }
            });
        }
    });
    return {success: success, data: result};
};

module.exports.updateFlower = async (flower) => {
    const product = await flowerRepository.findOneAndUpdate({_id: flower.id}, flower, {new: true});

    !!product ? console.log(`Product: '${product.name}' successfully updated !!`)
        : console.log(`Error while trying to update product: ${product.name}, ${product.id}`);
};

module.exports.addFlower = async flower => {
    const createdProduct = await flowerRepository.CREATE(flower);
    console.log(`A new product : ${createdProduct.name} created successfully`);
};

module.exports.removeFlower = async name => {
    const flower = await flowerRepository.findOneAndDelete({name: name});
    !!flower ? console.log(`Product: ${name} successfully deleted !!`)
        : console.log(`ERROR: Product: ${name} not found !!`);
};