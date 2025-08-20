const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product'); // ✅ Correct relative path

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/grambazaar', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'uploads')); // ✅ consistent path
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// Add Product
app.post('/api/add_product', upload.single('image'), async (req, res) => {
    try {
        const { name, category, description, price, stock } = req.body;

        if (!name || !category || !price || !stock) {
            return res.status(400).json({ message: 'All fields are required!' });
        }

        const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

        const newProduct = new Product({
            name,
            category,
            description: description || "",
            price: Number(price),
            stock: Number(stock),
            imageUrl
        });

        await newProduct.save();

        res.status(201).json({
            message: 'Product added successfully!',
            product: newProduct
        });
    } catch (err) {
        console.error("❌ Add product error:", err);
        res.status(500).json({ message: 'Server Error', error: err.message });
    }
});

// Get all products
app.get('/api/get_products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error("❌ Fetch error:", err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
});
