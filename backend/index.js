const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 7003;
const JWT_SECRET = process.env.JWT_SECRET || 'your_fallback_secret';

// Multimedia storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = 'uploads/';
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('MongoDB Atlas connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Models
const Portfolio = require('./models/Portfolio');

// Auth Middleware
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.sendStatus(401);

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

// Routes

// Login Route
app.post('/api/admin/login', (req, res) => {
    const { username, password } = req.body;
    const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
    const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'admin123';

    if (username === ADMIN_USER && password === ADMIN_PASS) {
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Get all portfolio items (Public)
app.get('/api/portfolio', async (req, res) => {
    try {
        const portfolio = await Portfolio.find().sort({ createdAt: -1 });
        res.json(portfolio);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new portfolio item (Protected)
app.post('/api/portfolio', authenticateToken, upload.single('image'), async (req, res) => {
    let imageUrl = req.body.imageUrl;

    if (req.file) {
        imageUrl = `http://localhost:7003/uploads/${req.file.filename}`;
    }

    const portfolio = new Portfolio({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        imageUrl: imageUrl,
    });

    try {
        const newPortfolio = await portfolio.save();
        res.status(201).json(newPortfolio);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a portfolio item (Protected)
app.put('/api/portfolio/:id', authenticateToken, upload.single('image'), async (req, res) => {
    try {
        let updateData = { ...req.body };

        if (req.file) {
            updateData.imageUrl = `http://localhost:7003/uploads/${req.file.filename}`;
        }

        const updatedPortfolio = await Portfolio.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );
        res.json(updatedPortfolio);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a portfolio item (Protected)
app.delete('/api/portfolio/:id', authenticateToken, async (req, res) => {
    try {
        await Portfolio.findByIdAndDelete(req.params.id);
        res.json({ message: 'Portfolio item deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Backend is running on port ${PORT}`);
});
