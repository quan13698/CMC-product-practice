const express = require("express");
const router = express.Router();
const {
  allProduct,
  getProductById,
} = require("../Apps/Controllers/productController");
const {
  createOrder,
  removeOrder,
  getAllOrder,
} = require("../Apps/Controllers/orderController");

//@desc Get all product
//@route Get /api/products
//@access public
router.get("/products", allProduct);
//@desc Get individual product
//@route Get /api/products
//@access public
router.get("/products/:id", getProductById);
//@desc Post, delete order
//@route Post /api/order
//@access public
router.post("/order", createOrder);
router.delete("/order/:id", removeOrder);

router.get("/all-order", getAllOrder);

module.exports = router;
