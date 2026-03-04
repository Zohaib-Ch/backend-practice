const cartModel = require("../models/cart.model");
const validationService = require("../services/validation.service");

async function addToCart(req, res) {
    try {
        const fields = ["product", "quantity", "price"];
        const validation = validationService.validateRequiredFields(fields, req.body);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }

        const { product, quantity, price } = req.body;
        const userId = req.user.id;

        const cart = await cartModel.create({
            user: userId,
            products: [{
                product,
                quantity,
                price
            }],
            totalAmount: quantity * price
        });

        res.status(201).json({
            message: "Product added to cart successfully",
            cart
        });
    } catch (error) {
        res.status(500).json({
            message: "Error adding product to cart",
            error: error.message
        });
    }
}


module.exports = { addToCart };