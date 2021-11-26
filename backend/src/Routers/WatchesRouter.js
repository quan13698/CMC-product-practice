const express = require('express');
const router = express.Router();
const watchesController = require('../Apps/Controllers/watchesController');
const orderController = require('../Apps/Controllers/orderController');

//@desc Get all product 
//@route Get /api/products
//@access public
router.get('/products', watchesController.watchesHomePage);
//@desc Get individual product 
//@route Get /api/products
//@access public
router.get('/products/:id', watchesController.getProductById);
//@desc Post, delete order 
//@route Post /api/order
//@access public
router.post("/order", orderController.createOrder);
router.delete("/order/:id", orderController.removeOrder);

router.get("/all-order", orderController.getAllOrder);

module.exports = router;