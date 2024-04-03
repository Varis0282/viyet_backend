const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

module.exports = async (req, res, next) => {
    try {
        const headers = req.header('Authorization');

        if (!headers) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // split the token to get the actual token
        const token = headers?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded._id);
        if (!user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        req.user = user;
        next();
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
};