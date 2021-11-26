const Order = require("../Models/Order");
const Product = require("../Models/Product");

const createOrder = async (req, res) => {
  const { items: cartItems, tax, shippingFee } = req.body;
  if (!cartItems || cartItems.length < 1) {
    return res.status(400).json({
      success: false,
      message: "No items added",
    });
  }
  if (!tax || !shippingFee) {
    return res.status(400).json({
      success: false,
      message: "Please provide tax nad shippingFee",
    });
  }
  let itemsOrder = [];
  let subtotal = 0;
  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      return res.status(400).json({
        success: false,
        message: `No product with id: ${item.product}`,
      });
    }
    const { product_name, price, color, _id } = dbProduct;
    const singleOrderItem = {
      amount: item.amount,
      product_name,
      price,
      color,
    };
    itemsOrder = [...itemsOrder, singleOrderItem];
    subtotal += item.amount * price;
  }
  const total = tax + shippingFee + subtotal;
  const order = await Order.create({
    cartItems,
    tax,
    shippingFee,
    subtotal,
    total,
  });
  return res.status(200).json({
    success: true,
    order,
  });
};

const removeOrder = async (req, res) => {
  const { id:orderId } = req.params;
  const deletedOrder = await Order.findOneAndDelete({ _id: orderId });
  if (!deletedOrder) {
    res.status(401).json({
      success: false,
      message: "Cannot find order ID",
    });
  }
  res.status(200).json({
    success: true,
    message: "Your order has been removed",
    deletedOrder,
  });
};

const getAllOrder = async (req, res) => {
  try {
    const orders = await Order.find({});
    return res.status(200).json({
      count: orders.length,
      success: true,
      orders,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Server error",
    });
  }
};

const updateOrder = async (req, res) => {};

module.exports = {
  createOrder,
  getAllOrder,
  removeOrder,
};
