const express = require('express');
const recipes = require('../routes/recipes');
const error = require('../middlewares/error');

module.exports = function initRoutes(app) {
    // app.use(cors());
    app.use(express.json());

    app.use('/api/recipes', recipes);

    app.use(error);
};