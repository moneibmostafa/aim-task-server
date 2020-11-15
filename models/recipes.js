const mongoose = require('mongoose');
const { ingredientSchema } = require('./ingredient');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 30,
        required: true,
    },    
    creatorName: {
        type: String,
        minlength: 5,
        maxlength: 50,
    },
    servings: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    description: {
        type: String,
        minlength: 5,
        maxlength: 500,
        required: true,
    },
    nutritionFacts: {
        calories : {
            type: Number,
            min: 0,
            required: true,
        },
        protein : {
            type: Number,
            min: 0,
        },
        carbohydrates : {
            type: Number,
            min: 0,
        },
        fat : {
            type: Number,
            min: 0,
        },
        sodium : {
            type: Number,
            min: 0,
        },
    },
    ingredients: [ingredientSchema],
    recipeSteps: {
        type: 'string',
        minLength: 5,
        maxLength: 500,
    },
    views: {
        type: Number,
        min: 0,
        default: 0,
    },
    image: { 
        type: String,
        required: true,
    },
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

exports.Recipe = Recipe;
