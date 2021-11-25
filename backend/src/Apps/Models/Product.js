const mongoose = require('mongoose');
const watchesSchema = new mongoose.Schema({
    product_name: {
        type: String,
        required: [true, ' Please provide product name'],
        maxlength: [100, 'product name cannot be more than 100']
    },
    color: {
        type: String,
        required: [true, "A product needs a color"]
    },
    description: {
        type: String,
        required: false,
    },
    price: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true
    },
    rate: {
        type: String,
        default: "4 star",
    }
})
module.exports = mongoose.model('Product', watchesSchema, "Product"); 