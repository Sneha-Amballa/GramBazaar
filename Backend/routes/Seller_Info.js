// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const path = require('path');
// const Seller = require('../models/Seller_Info');

// const app = express();

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/grambazaar', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// }).then(() => console.log(" MongoDB connected"))
//   .catch(err => console.error(err));

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.post('/api/seller/push', async (req, res) => {
//     try {
//         const { fullName, email, phone, location, bio, preferredLanguage, products, orders, rating } = req.body;

//         const seller = await Seller.findOneAndUpdate(
//             { email },
//             { fullName, phone, location, bio, preferredLanguage, products, orders, rating },
//             { new: true, upsert: true }
//         );

//         res.status(201).json({ message: 'Seller profile pushed successfully!', seller });
//     } catch (err) {
//         console.error("❌ Error in /api/seller/push:", err); // show full error in console
//         res.status(500).json({ message: 'Server Error', error: err.message });
//     }
// });


// // Route: Add or Update Seller Profile
// app.post('/api/seller/update', async (req, res) => {
//     try {
//         const { fullName, email, phone, location, bio, preferredLanguage } = req.body;

//         const seller = await Seller.findOneAndUpdate(
//             { email },
//             { fullName, phone, location, bio, preferredLanguage },
//             { new: true, upsert: true }  // create if not exists
//         );

//         res.status(201).json({ message: 'Seller profile updated successfully!', seller });
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // Route: Get Seller by Email
// app.get('/api/seller/:email', async (req, res) => {
//     try {
//         const seller = await Seller.findOne({ email: req.params.email });
//         if (!seller) return res.status(404).json({ message: "Seller not found" });
//         res.json(seller);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // Route: Get All Sellers (optional)
// app.get('/api/sellers', async (req, res) => {
//     try {
//         const sellers = await Seller.find();
//         res.json(sellers);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`🚀 Server running on http://localhost:${PORT}`);
// });
