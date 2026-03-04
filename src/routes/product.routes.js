const express = require('express');
const productController = require("../controllers/product.controller")

const router = express.Router();

router.post('/create', productController.createProduct)

router.get('/all', productController.getAllProducts)

router.delete('/delete/:id', productController.deleteProduct)

router.put('/update/:id', productController.updateProduct)


module.exports = router;
