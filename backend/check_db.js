const mongoose = require('mongoose');
require('dotenv').config();
const Portfolio = require('./models/Portfolio');

const checkDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const count = await Portfolio.countDocuments();
        console.log(`Current Portfolio count: ${count}`);
        const items = await Portfolio.find().limit(5);
        console.log('Sample Items:', items);
        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

checkDB();
