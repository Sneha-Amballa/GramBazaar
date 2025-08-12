const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/grambazaar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

//Route: Add Product
app.post('/api/get_products', async (req, res) => {
    try {
        const { name, category, description, price, stock } = req.body;
        const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';

        const newProduct = new Product({
            name,
            category,
            description,
            price,
            stock,
            imageUrl
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product added successfully!', product: newProduct });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

//Route: Get all products (optional)
app.get('/api/get_products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
