const { validator } = require('./ajvValidator');

const RecipeSchemaAjv = {
    title: 'Recipe',
    description: 'Recipe data',
    type: 'object',
    required: ['title', 'servings', 'description', 'recipeSteps'],
    properties: {
        title: { type: 'string' },
        creatorName: { type: 'string' },
        servings: { type: 'number', minimum: 1 },
        description: {
            type: 'string',
            minLength: 5,
            maxLength: 500,
        },
        nutritionFacts: {
            calories : {
                type: 'number',
                minimum: 0,
                required: true,
            },
            protein : {
                type: 'number',
                minimum: 0,
            },
            carbohydrates : {
                type: 'number',
                minimum: 0,
            },
            fat : {
                type: 'number',
                minimum: 0,
            },
            sodium : {
                type: 'number',
                minimum: 0,
            },
        },
        recipeSteps: {
            type: 'string',
            minLength: 5,
            maxLength: 500,
        },        
    },
};

function validateRecipe(recipe) {
    return validator(recipe, RecipeSchemaAjv, []);
}

module.exports = { validate: validateRecipe };