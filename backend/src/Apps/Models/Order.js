const mongoose = require("mongoose");
const singleCartItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
    required: true,
  }
});

const OrderSchema = new mongoose.Schema({
  tax: {
    type: Number,
    required: true,
  },
  shippingFee: {
    type: Number,
    required: true,
  },
  subtotal: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  cartItems: [singleCartItemSchema],
});
module.exports = mongoose.model("Order", OrderSchema, "Order");
