const orderModel = require("../models/order.model");
const validationService = require("../services/validation.service");

async function createOrder(req, res) {
    try {
        const fields = ["products", "totalAmount"];
        const validation = validationService.validateRequiredFields(fields, req.body);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }

        const { products, totalAmount } = req.body;
        const userId = req.user.id;

        const order = await orderModel.create({
            user: userId,
            products,
            totalAmount
        });

        res.status(201).json({
            message: "Order placed successfully",
            order
        });
    } catch (error) {
        res.status(500).json({
            message: "Error placing order",
            error: error.message
        });
    }
}

async function getUserOrders(req, res) {
    try {
        const userId = req.user.id;
        const orders = await orderModel.find({ user: userId }).populate("products.product");

        res.status(200).json({
            message: "Orders fetched successfully",
            orders
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching orders",
            error: error.message
        });
    }
}

module.exports = { createOrder, getUserOrders };
