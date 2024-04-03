const express = require('express');
const router = express.Router();
const privateResource = require('../middleware/privateResources');
const { successObj, errorObj } = require('../settings');
const User = require('../models/userModel');

// add a movie in favorite in userModel
router.post('/addFavorite', privateResource, async (req, res) => {
    try {
        const data = req.body;
        if (!data) {
            return res.json({ message: 'Movie not found', ...errorObj });
        }
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.json({ message: 'User not found', ...errorObj });
        }
        const isMovieExist = user.favourite.find(movie => movie.id === data.id);
        if (isMovieExist) {
            return res.json({ message: 'Movie already in favorite', ...errorObj });
        }
        user.favourite.push(data);
        await user.save();
        res.json({ message: 'Movie added to favorite', ...successObj, user });
    } catch (err) {
        res.json({ message: err.message, ...errorObj });
    }
});

// remove a movie from favorite in userModel
router.delete('/removeFavorite/:id', privateResource, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.json({ message: 'User not found', ...errorObj });
        }
        // delete movie from favorite
        user.favourite = user.favourite.filter(movie => movie.id.toString() !== req.params.id);

        await user.save();
        res.json({ message: 'Movie removed from favorite', ...successObj, user });
    } catch (err) {
        res.json({ message: err.message, ...errorObj });
    }
});

// add a movie in watchlist in userModel
router.post('/addWatchlist', privateResource, async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.json({ message: 'User not found', ...errorObj });
        }
        const isMovieExist = user.watchlist.find(movie => movie.id === data.id);
        if (isMovieExist) {
            return res.json({ message: 'Movie already in watchlist', ...errorObj });
        }
        user.watchlist.push(data);
        await user.save();
        res.json({ message: 'Movie added to watchlist', ...successObj, user });
    } catch (err) {
        res.json({ message: err.message, ...errorObj });
    }
});

// remove a movie from watchlist in userModel
router.delete('/removeWatchlist/:id', privateResource, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.json({ message: 'User not found', ...errorObj });
        }
        // delete movie from watchlist
        user.watchlist = user.watchlist.filter(movie => movie.id.toString() !== req.params.id);

        await user.save();
        res.json({ message: 'Movie removed from watchlist', ...successObj, user });
    } catch (err) {
        res.json({ message: err.message, ...errorObj });
    }
});

// get user details
router.get('/me', privateResource, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.json({ message: 'User not found', ...errorObj });
        }
        user.password = undefined;
        res.json({ message: 'User details', ...successObj, user });
    } catch (err) {
        res.json({ message: err.message, ...errorObj });
    }
});

// change user name
router.put('/me/update', privateResource, async (req, res) => {
    try {
        const { name } = req.body;
        const user = await User.findById(req.user._id);
        if (!user) {
            return res.json({ message: 'User not found', ...errorObj });
        }
        user.name = name;
        await user.save();
        res.json({ message: 'Name changed successfully', ...successObj });
    } catch (err) {
        res.json({ message: err.message, ...errorObj });
    }
});


module.exports = router;

