const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.MONGO_URI;


const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log('MongoDB is Connected');
    } catch (err) {
        console.error(err.message);
    }
}

connectDB();