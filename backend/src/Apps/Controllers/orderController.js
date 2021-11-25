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
  for (const item of cartItems) {
    const dbProduct = await Product.findOne({ _id: item.product });
    if (!dbProduct) {
      return res.status(400).json({
        success: false,
        message: `No product with id: ${item.product}`,
      })
    }else{
      return res.status(201).json({
        success: true, 
        message: "Order Added!"
      })
    }
  }
};

module.exports = {
  createOrder,
};
