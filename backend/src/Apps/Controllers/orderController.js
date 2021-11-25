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
  let orderItems = [];
  let subtotal = 0;
  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      return res.status(400).json({
        success: false,
        message: `No product with id: ${item.product}`,
      });
    }
    const { product_name, color, price, _id } = dbProduct;
    const singleItemOrder = {
      amount: item.amount,
      product_name,
      color,
      price,
      _id,
    };
    orderItems = [...orderItems, singleItemOrder];
    subtotal += item.amount * price;
  }
  console.log(orderItems);
  console.log(subtotal);
  res.send("Done!");
};

module.exports = {
  createOrder,
};
