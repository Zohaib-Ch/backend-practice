const productModel = require("../models/product.model");
const validationService = require("../services/validation.service");

async function createProduct(req, res) {
    try {
        const fields = ["name", "description", "price", "category", "stock"];
        const validation = validationService.validateRequiredFields(fields, req.body);
        if (!validation.isValid) {
            return res.status(400).json({ message: validation.message });
        }

        const { name, description, price, category, stock } = req.body;

        const product = await productModel.create({
            name,
            description,
            price,
            category,
            stock
        });

        res.status(201).json({
            message: "Product created successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating product",
            error: error.message
        });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;

        const product = await productModel.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting product",
            error: error.message
        });
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await productModel.find({});

        res.status(200).json({
            message: "Products fetched successfully",
            products
        });
    } catch (error) {
        res.status(500).json({
            message: "Error fetching products",
            error: error.message
        });
    }
}
async function updateProduct(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, category, stock } = req.body;

        const product = await productModel.findByIdAndUpdate(
            id,
            { name, description, price, category, stock },
            { new: true, runValidators: true }
        );

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product updated successfully",
            product
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating product",
            error: error.message
        });
    }
}


module.exports = { createProduct, getAllProducts, deleteProduct, updateProduct }
