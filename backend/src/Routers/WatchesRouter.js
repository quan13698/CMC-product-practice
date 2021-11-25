const express = require('express');
const router = express.Router();
const watchesController = require('../Apps/Controllers/watchesController');
const orderController = require('../Apps/Controllers/orderController');

//@desc Get all product 
//@route Get /api/home-page
//@access public
router.get('/products', watchesController.watchesHomePage);
//@desc Get all product 
//@route Get /api/home-page
//@access public
router.get('/products/:id', watchesController.getProductById);

router.post("/order", orderController.createOrder);

module.exports = router;