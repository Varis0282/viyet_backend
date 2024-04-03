const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const { successObj, errorObj } = require('../settings');

// register user
router.post('/register', async (req, res) => {
    try {
        let { name, email, password } = req.body;
        let user = await User.countDocuments({ email });
        if (user) {
            return res.json({ message: 'User Already Exists', ...errorObj });
        }
        let salt = await bcrypt.genSalt(10);
        let hash = await bcrypt.hash(password, salt);
        let newUser = new User({ name, email, password: hash });
        await newUser.save();
        newUser.password = undefined;
        res.json({ message: 'User Registered Successfully', ...successObj, newUser });
    } catch (err) {
        res.json({ message: err.message, ...errorObj });
    }
});

// login user
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ message: 'Invalid credential', ...errorObj });
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.json({ message: 'Invalid email or password', ...errorObj });
        }
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
        const { password: userPassword, ...others } = user._doc;
        res.json({ token, user: others, ...successObj });
    } catch (error) {
        res.json({ message: error.message, ...errorObj });
    }
});


module.exports = router;