const mongoose = require('mongoose');
const { ingredientSchema } = require('./ingredient');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 2,
        maxlength: 30,
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
    steps: [{
        type: String,
        min: 2,
        max: 50,
    }],
    views: {
        type: Number,
        min: 0,
        default: 0,
    },
    likes: {
        type: Number,
        min: 0,
        default: 0,
    },
    dislikes: {
        type: Number,
        min: 0,
        default: 0,
    },
    images: [{ 
        data: Buffer, 
        contentType: String,
    }],
}, { timestamps: true });

const Recipe = mongoose.model('Recipe', recipeSchema);

exports.Recipe = Recipe;
