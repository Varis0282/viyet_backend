const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const Mongo_URI = process.env.MONGO_URI;

const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT;


app.use(express.json());
app.use(cors());


app.use('/movies', movieRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);

// log all requests with method ,url and response time
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    const start = Date.now();
    next();
    const responseTime = Date.now() - start;
    console.log(`Response time: ${responseTime}ms`);
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});

mongoose.connect(Mongo_URI)
    .then(() => {
        console.log('Connected to the database');
        try {
            app.listen(port, () => {
                console.log(`Server is running on ${port}`);
            });
        } catch (err) {
            console.log('Error starting the server', err);
        }
    })
    .catch((err) => {
        console.log(err)
        console.log('Error connecting to the database');
    });