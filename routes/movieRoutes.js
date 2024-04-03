const express = require('express');
const router = express.Router();
const axios = require('axios');
const privateResource = require('../middleware/privateResources');
const { successObj, errorObj } = require('../settings');


const headers = {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjODY1ZmEzYjc2YzhmY2RkMWUwYTQ2OWVkMmEwNDcyZCIsInN1YiI6IjY2MDlhN2JkNmY0M2VjMDE0N2E4ZGIzMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.-Lyl6SYwUlOQVpvXIewG96VYfrYN6nglTq3aXssFiQs'
}


// get all movies
router.get('/', privateResource, (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${req.query.page || 1}`
        , { headers })
        .then(response => {

            // // apply pagination
            // let current = req.query.current || 1;
            // let pageSize = req.query.pageSize || 10;
            // let start = (current - 1) * pageSize;
            // let end = current * pageSize;
            // let data = response.data.movies.slice(start, end);
            // let count = data.length;
            // let total = response.data.movies.length;
            // let totalPages = Math.ceil(total / pageSize);

            // // res.json({ total, data, current, pageSize, totalPages })
            // res.json({ data, current, count, pageSize, total, totalPages, ...successObj })

            res.json({ data: response.data, ...successObj })
        })
        .catch(err => {
            res.json({ message: err.message, ...errorObj })
        })
})

// get trending movies
router.get('/trending', privateResource, (req, res) => {
    axios.get(`https://api.themoviedb.org/3/trending/movie/day`, { headers })
        .then(response => {
            res.json({ data: response.data, ...successObj })
        })
        .catch(err => {
            res.json({ message: err.message, ...errorObj })
        })
})

// search movies
router.get('/search', privateResource, (req, res) => {
    axios.get(`https://api.themoviedb.org/3/search/movie?query=${req.query.query}&page=${req.query.page || 1}`, { headers })
        .then(response => {
            res.json({ data: response.data, ...successObj })
        })
        .catch(err => {
            res.json({ message: err.message, ...errorObj })
        })
})

// get all genres
router.get('/genres', privateResource, (req, res) => {
    axios.get(`https://api.themoviedb.org/3/genre/movie/list?language=en`, { headers })
        .then(response => {
            res.json({ data: response.data, ...successObj })
        })
        .catch(err => {
            res.json({ message: err.message, ...errorObj })
        })
})

// get all movies by genre
router.get('/genre/:id', privateResource, (req, res) => {
    axios.get(`https://api.themoviedb.org/3/discover/movie?with_genres=${req.params.id}`, { headers })
        .then(response => {
            res.json({ data: response.data, ...successObj })
        })
        .catch(err => {
            res.json({ message: err.message, ...errorObj })
        })
})

// get movie details
router.get('/:id', privateResource, (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}`, { headers })
        .then(response => {
            res.json({ data: response.data, ...successObj })
        })
        .catch(err => {
            res.json({ message: err.message, ...errorObj })
        })
})

// get movie credits
router.get('/:id/credits', privateResource, (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/credits`, { headers })
        .then(response => {
            res.json({ data: response.data, ...successObj })
        })
        .catch(err => {
            res.json({ message: err.message, ...errorObj })
        })
})

// get movie reviews
router.get('/:id/reviews', privateResource, (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/reviews`, { headers })
        .then(response => {
            res.json({ data: response.data, ...successObj })
        })
        .catch(err => {
            res.json({ message: err.message, ...errorObj })
        })
})

// get similar movies
router.get('/:id/similar', privateResource, (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/similar`, { headers })
        .then(response => {
            res.json({ data: response.data, ...successObj })
        })
        .catch(err => {
            res.json({ message: err.message, ...errorObj })
        })
})

// get movie images
router.get('/:id/images', privateResource, (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/images`, { headers })
        .then(response => {
            res.json({ data: response.data, ...successObj })
        })
        .catch(err => {
            res.json({ message: err.message, ...errorObj })
        })
})

// get movie keywords
router.get('/:id/keywords', privateResource, (req, res) => {
    axios.get(`https://api.themoviedb.org/3/movie/${req.params.id}/keywords`, { headers })
        .then(response => {
            res.json({ data: response.data, ...successObj })
        })
        .catch(err => {
            res.json({ message: err.message, ...errorObj })
        })
})



module.exports = router;