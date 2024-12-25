const Product = require('../models/Product');

const productController = {
    getAllProducts: async (req, res) => {
        try {
            const products = await Product.getAll();
            res.json(products);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    },

    getProductById: async (req, res) => {
        const { id } = req.params;
        try {
            const product = await Product.getById(id);
            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch product' });
        }
    },

    addProduct: async (req, res) => {
        const { name, price } = req.body;
        if (!name || typeof name !== 'string') {
            return res.status(400).json({ error: 'Product name is required and must be a string.' });
        }

        if (typeof price !== 'number' || price <= 0) {
            return res.status(400).json({ error: 'Price is required and must be a positive number.' });
        }

        try {
            const newProduct = await Product.create(name, price);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ error: 'Failed to add product' });
        }
    },

    deleteProductById: async (req, res) => {
        const { id } = req.params;
        try {
            const success = await Product.deleteById(id);
            if (!success) {
                return res.status(404).json({ error: 'Product not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete product' });
        }
    }
};

module.exports = productController;
