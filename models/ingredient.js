const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema(
    {
        ingredient: {
            type: String,
            minlength: 2,
            maxlength: 20,
            required: true,
        },
        type: {
            type: String,
            enum: ['Cup', 'Teaspoon', 'Tablespoon', 'Scale'],
            required: true,
        },
        size: {
            type: Number,
            required: true,
            min: 0,
        },
    },
);

module.exports = { ingredientSchema };
